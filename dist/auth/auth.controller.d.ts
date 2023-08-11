import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-auth.dto";
import { CreateClientDto } from "../client/dto/create-client.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateClientDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}
