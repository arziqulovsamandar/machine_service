import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Response } from "express";
import { Client } from "./model/client.model";
import { LoginClientDto } from "./dto/login-client.dto";
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    registration(createClientDto: CreateClientDto, res: Response): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
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
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateClientDto: UpdateClientDto, refreshToken: string): Promise<{
        message: string;
        updated: Client;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        client: Client;
    }>;
    refresh(id: string, refreshToken: string, res: Response): Promise<{
        message: string;
        client: Client;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
