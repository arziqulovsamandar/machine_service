import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login-auth.dto";
import { ClientService } from "../client/client.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: ClientService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    private validateUser;
    registration(userDto: CreateAdminDto): Promise<{
        token: string;
    }>;
    private generateToken;
}
