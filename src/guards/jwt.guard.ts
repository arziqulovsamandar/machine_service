import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Client } from "../client/model/client.model";
import { Admin } from "../admin/model/admin.model";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException(`Unauthorized`);
        }
        const bearer = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];

        if (bearer != "Bearer" || !token) {
            throw new UnauthorizedException("Unauthorized");
        }

        async function verify(token: string, jwtService: JwtService) {
            try {
                const user: Partial<Worker | Client | Admin> =
                    await jwtService.verify(token, {
                        secret: process.env.ACCESS_TOKEN_KEY,
                    });
                req.payload = user;
                if (!user) {
                    throw new UnauthorizedException("Invalid token provided");
                }
                return true;
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        }
        return verify(token, this.jwtService);
    }
}
