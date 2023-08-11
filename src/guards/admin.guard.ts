import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/model/admin.model";
import { Model } from "sequelize-typescript";

interface AdminGuardAttr extends Model<Admin> {
    role: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        async function verify(token: string, jwtService: JwtService) {
            try {
                const user: Partial<AdminGuardAttr> = await jwtService.verify(
                    token,
                    { secret: process.env.ACCESS_TOKEN_KEY }
                );
                if (user.role == "Admin") {
                    return true;
                }
                throw new UnauthorizedException("User is not Admin");
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        }
        return verify(token, this.jwtService);
    }
}
