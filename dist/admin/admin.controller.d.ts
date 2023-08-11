import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    registration(createAdminDto: CreateAdminDto, res: Response): Promise<{
        message: string;
        admin: import("./model/admin.model").Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    login(loginAdminDto: LoginAdminDto, res: Response): Promise<{
        message: string;
        admin: import("./model/admin.model").Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        admin: import("./model/admin.model").Admin;
    }>;
    findAll(): Promise<import("./model/admin.model").Admin[]>;
    findOne(id: string): Promise<import("./model/admin.model").Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<{
        message: string;
        updated: import("./model/admin.model").Admin;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        admin: import("./model/admin.model").Admin;
    }>;
    refresh(id: string, refreshToken: string, res: Response): Promise<{
        message: string;
        admin: import("./model/admin.model").Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
