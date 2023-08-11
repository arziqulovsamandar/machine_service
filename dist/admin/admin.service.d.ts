import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./model/admin.model";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
export declare class AdminService {
    private adminRepo;
    private readonly jwtService;
    private readonly mailService;
    constructor(adminRepo: typeof Admin, jwtService: JwtService, mailService: MailService);
    registration(createAdminDto: CreateAdminDto, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getTokens(admin: Admin): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashRefeshToken(refresh_token: string, admin: Admin, res: Response, uniqueKey?: string): Promise<[affectedCount: number, affectedRows: Admin[]]>;
    login(loginAdminDto: LoginAdminDto, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refreshToken: string, res: Response): Promise<{
        message: string;
        admin: Admin;
    }>;
    refreshToken(admin_id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<{
        message: string;
        updated: Admin;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    activate(link: string): Promise<{
        message: string;
        admin: Admin;
    }>;
}
