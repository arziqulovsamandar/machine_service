import { CreateWorkerDto } from "./dto/create-worker.dto";
import { UpdateWorkerDto } from "./dto/update-worker.dto";
import { Worker } from "./model/worker.model";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { LoginWorkerDto } from "./dto/login-worker.dto";
export declare class WorkerService {
    private clientRepo;
    private readonly jwtService;
    private readonly mailService;
    constructor(clientRepo: typeof Worker, jwtService: JwtService, mailService: MailService);
    registration(createWorkerDto: CreateWorkerDto, res: Response): Promise<{
        message: string;
        worker: Worker;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getTokens(worker: Worker): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashRefeshToken(refresh_token: string, worker: Worker, res: Response, uniqueKey?: string): Promise<[affectedCount: number, affectedRows: Worker[]]>;
    login(loginWorkerDto: LoginWorkerDto, res: Response): Promise<{
        message: string;
        worker: Worker;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        worker: Worker;
    }>;
    refreshToken(worker_id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        worker: any;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(): Promise<Worker[]>;
    findOne(id: number): Promise<Worker>;
    update(id: number, updateWorkerDto: UpdateWorkerDto, refreshToken: string): Promise<{
        message: string;
        updated: Worker;
    }>;
    remove(id: number, refreshToken: string): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        worker: Worker;
    }>;
}
