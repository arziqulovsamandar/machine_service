import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./model/client.model";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { LoginClientDto } from "./dto/login-client.dto";

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async registration(
        createClientDto: CreateClientDto,
        res: Response
    ): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }> {
        const client = await this.clientRepo.findOne({
            where: { email: createClientDto.email },
        });
        if (client) {
            throw new BadRequestException("Email already exists");
        }
        if (createClientDto.password !== createClientDto.confirm_password) {
            throw new BadRequestException("Passwords is not matched");
        }

        const hashed_password = await bcrypt.hash(createClientDto.password, 7);
        const newClient = await this.clientRepo.create({
            ...createClientDto,
            password: hashed_password,
        });
        const tokens = await this.getTokens(newClient);
        const uniqueKey: string = uuidv4();

        const updatedClient = await this.hashRefeshToken(
            tokens.refresh_token,
            newClient,
            res,
            uniqueKey
        );

        try {
            await this.mailService.sendClientConfirmation(updatedClient[1][0]);
        } catch (error) {
            console.log(error);
        }

        const response = {
            message: "Clinet registered",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }

    async getTokens(client: Client) {
        const jwtPayload = {
            id: client.id,
            is_active: client.is_active,
            name: client.first_name,
            role: "client",
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),

            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async hashRefeshToken(
        refresh_token: string,
        client: Client,
        res: Response,
        uniqueKey?: string
    ): Promise<[affectedCount: number, affectedRows: Client[]]> {
        const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
        if (uniqueKey) {
            const updatedClient = await this.clientRepo.update(
                {
                    refresh_token: hashed_refresh_token,
                    activation_link: uniqueKey,
                },
                { where: { id: client.dataValues.id }, returning: true }
            );
            res.cookie("refresh_token", refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return updatedClient;
        }

        const updatedClient = await this.clientRepo.update(
            { refresh_token: hashed_refresh_token },
            { where: { id: client.id }, returning: true }
        );

        res.cookie("refresh_token", refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return updatedClient;
    }

    async login(loginClientDto: LoginClientDto, res: Response) {
        const { email, password } = loginClientDto;
        const client = await this.clientRepo.findOne({ where: { email } });
        if (!client) {
            throw new UnauthorizedException("Client is not registered");
        }
        const isMatchPass = await bcrypt.compare(password, client.password);
        if (!isMatchPass) {
            throw new UnauthorizedException("Client is not registered(pass");
        }

        const tokens = await this.getTokens(client);
        const updatedClient = await this.hashRefeshToken(
            tokens.refresh_token,
            client,
            res
        );

        const response = {
            message: "Clinet logged in",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }

    async logout(refreshToken: string, res: Response) {
        const clientData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if (!clientData) {
            throw new ForbiddenException("Client not found");
        }
        const updatedClient = await this.clientRepo.update(
            { refresh_token: null },
            { where: { id: clientData.id }, returning: true }
        );

        res.clearCookie("refresh_token");
        const response = {
            message: "Client logged out successfullu",
            client: updatedClient[1][0],
        };
        return response;
    }

    async refreshToken(client_id: number, refreshToken: string, res: Response) {
        const decodedToken = this.jwtService.decode(refreshToken);

        if (client_id != decodedToken["id"]) {
            throw new BadRequestException("Client not found 1");
        }
        const client = await this.clientRepo.findOne({
            where: { id: client_id },
        });
        if (!client) {
            throw new BadRequestException("Client not found");
        }

        const tokenMatch = await bcrypt.compare(
            refreshToken,
            client.refresh_token
        );

        if (!tokenMatch) {
            throw new ForbiddenException("Forbidden");
        }

        const tokens = await this.getTokens(client);

        const updatedClient = await this.hashRefeshToken(
            refreshToken,
            client,
            res
        );

        const response = {
            message: "Client refreshed",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.clientRepo.findAll({include:{all:true}});
        if (clients.length > 0) {
            return clients;
        }
        throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    async findOne(id: number): Promise<Client> {
        const client = await this.clientRepo.findByPk(id);
        if (client) {
            return client;
        }
        
        throw new HttpException("Not found with such id", HttpStatus.NOT_FOUND);
    }

    async update(
        id: number,
        updateClientDto: UpdateClientDto,
        refreshToken: string
    ): Promise<{ message: string; updated: Client }> {
        const decodedToken = this.jwtService.decode(refreshToken);

        if (id != decodedToken["id"]) {
            throw new BadRequestException(
                "You can update only your information"
            );
        }
        const client = await this.clientRepo.findByPk(id);
        if (client) {
            const updatedClient = await this.clientRepo.update(
                updateClientDto,
                {
                    where: { id },
                    returning: true,
                }
            );

            if (updatedClient[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedClient[1][0].dataValues,
                };
            }
            throw new BadRequestException("Did not updated");
        } else {
            throw new HttpException(
                "Not found with such id",
                HttpStatus.NOT_FOUND
            );
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const deleted = await this.clientRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new HttpException("Not found with such id", HttpStatus.NOT_FOUND);
    }

    async activate(link: string) {
        if (!link) {
            throw new BadRequestException("Activation link not found");
        }
        const updatedClient = await this.clientRepo.update(
            { is_active: true },
            {
                where: { activation_link: link, is_active: false },
                returning: true,
            }
        );

        if (!updatedClient[1][0]) {
            throw new BadRequestException("Client already activated");
        }

        const response = {
            message: "Client activated successfully",
            client: updatedClient[1][0],
        };
        return response;
    }
}
