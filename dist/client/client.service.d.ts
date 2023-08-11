import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./model/client.model";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { LoginClientDto } from "./dto/login-client.dto";
export declare class ClientService {
    private clientRepo;
    private readonly jwtService;
    private readonly mailService;
    constructor(clientRepo: typeof Client, jwtService: JwtService, mailService: MailService);
    registration(createClientDto: CreateClientDto, res: Response): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getTokens(client: Client): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashRefeshToken(refresh_token: string, client: Client, res: Response, uniqueKey?: string): Promise<[affectedCount: number, affectedRows: Client[]]>;
    login(loginClientDto: LoginClientDto, res: Response): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        client: Client;
    }>;
    refreshToken(client_id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    update(id: number, updateClientDto: UpdateClientDto, refreshToken: string): Promise<{
        message: string;
        updated: Client;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        client: Client;
    }>;
}
