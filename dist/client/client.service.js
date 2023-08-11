"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const sequelize_1 = require("@nestjs/sequelize");
const client_model_1 = require("./model/client.model");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
let ClientService = exports.ClientService = class ClientService {
    constructor(clientRepo, jwtService, mailService) {
        this.clientRepo = clientRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registration(createClientDto, res) {
        const client = await this.clientRepo.findOne({
            where: { email: createClientDto.email },
        });
        if (client) {
            throw new common_1.BadRequestException("Email already exists");
        }
        if (createClientDto.password !== createClientDto.confirm_password) {
            throw new common_1.BadRequestException("Passwords is not matched");
        }
        const hashed_password = await bcrypt.hash(createClientDto.password, 7);
        const newClient = await this.clientRepo.create({
            ...createClientDto,
            password: hashed_password,
        });
        const tokens = await this.getTokens(newClient);
        const uniqueKey = (0, uuid_1.v4)();
        const updatedClient = await this.hashRefeshToken(tokens.refresh_token, newClient, res, uniqueKey);
        try {
            await this.mailService.sendClientConfirmation(updatedClient[1][0]);
        }
        catch (error) {
            console.log(error);
        }
        const response = {
            message: "Clinet registered",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }
    async getTokens(client) {
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
    async hashRefeshToken(refresh_token, client, res, uniqueKey) {
        const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
        if (uniqueKey) {
            const updatedClient = await this.clientRepo.update({
                refresh_token: hashed_refresh_token,
                activation_link: uniqueKey,
            }, { where: { id: client.dataValues.id }, returning: true });
            res.cookie("refresh_token", refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return updatedClient;
        }
        const updatedClient = await this.clientRepo.update({ refresh_token: hashed_refresh_token }, { where: { id: client.id }, returning: true });
        res.cookie("refresh_token", refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return updatedClient;
    }
    async login(loginClientDto, res) {
        const { email, password } = loginClientDto;
        const client = await this.clientRepo.findOne({ where: { email } });
        if (!client) {
            throw new common_1.UnauthorizedException("Client is not registered");
        }
        const isMatchPass = await bcrypt.compare(password, client.password);
        if (!isMatchPass) {
            throw new common_1.UnauthorizedException("Client is not registered(pass");
        }
        const tokens = await this.getTokens(client);
        const updatedClient = await this.hashRefeshToken(tokens.refresh_token, client, res);
        const response = {
            message: "Clinet logged in",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }
    async logout(refreshToken, res) {
        const clientData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if (!clientData) {
            throw new common_1.ForbiddenException("Client not found");
        }
        const updatedClient = await this.clientRepo.update({ refresh_token: null }, { where: { id: clientData.id }, returning: true });
        res.clearCookie("refresh_token");
        const response = {
            message: "Client logged out successfullu",
            client: updatedClient[1][0],
        };
        return response;
    }
    async refreshToken(client_id, refreshToken, res) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (client_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("Client not found 1");
        }
        const client = await this.clientRepo.findOne({
            where: { id: client_id },
        });
        if (!client) {
            throw new common_1.BadRequestException("Client not found");
        }
        const tokenMatch = await bcrypt.compare(refreshToken, client.refresh_token);
        if (!tokenMatch) {
            throw new common_1.ForbiddenException("Forbidden");
        }
        const tokens = await this.getTokens(client);
        const updatedClient = await this.hashRefeshToken(refreshToken, client, res);
        const response = {
            message: "Client refreshed",
            client: updatedClient[1][0],
            tokens,
        };
        return response;
    }
    async findAll() {
        const clients = await this.clientRepo.findAll({ include: { all: true } });
        if (clients.length > 0) {
            return clients;
        }
        throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const client = await this.clientRepo.findByPk(id);
        if (client) {
            return client;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateClientDto, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can update only your information");
        }
        const client = await this.clientRepo.findByPk(id);
        if (client) {
            const updatedClient = await this.clientRepo.update(updateClientDto, {
                where: { id },
                returning: true,
            });
            if (updatedClient[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedClient[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id) {
        const deleted = await this.clientRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async activate(link) {
        if (!link) {
            throw new common_1.BadRequestException("Activation link not found");
        }
        const updatedClient = await this.clientRepo.update({ is_active: true }, {
            where: { activation_link: link, is_active: false },
            returning: true,
        });
        if (!updatedClient[1][0]) {
            throw new common_1.BadRequestException("Client already activated");
        }
        const response = {
            message: "Client activated successfully",
            client: updatedClient[1][0],
        };
        return response;
    }
};
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService])
], ClientService);
//# sourceMappingURL=client.service.js.map