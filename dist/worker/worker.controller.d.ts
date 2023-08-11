import { WorkerService } from "./worker.service";
import { CreateWorkerDto } from "./dto/create-worker.dto";
import { UpdateWorkerDto } from "./dto/update-worker.dto";
import { Response } from "express";
import { Worker } from "./model/worker.model";
import { LoginWorkerDto } from "./dto/login-worker.dto";
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    registration(createWorkerDto: CreateWorkerDto, res: Response): Promise<{
        message: string;
        worker: Worker;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
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
    findAll(): Promise<Worker[]>;
    findOne(id: string): Promise<Worker>;
    update(id: string, updateWorkerDto: UpdateWorkerDto, refreshToken: string): Promise<{
        message: string;
        updated: Worker;
    }>;
    remove(id: string, refreshToken: string): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        worker: Worker;
    }>;
    refresh(id: string, refreshToken: string, res: Response): Promise<{
        message: string;
        worker: any;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
