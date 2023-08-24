import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/model/admin.model";

@Injectable()
export class IsCreatorGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const token = authHeader;

        console.log("IS-CRETOR","req",req,"AUTHHEADER",authHeader,"TOKEN",token);
        

        async function verify(token: string, jwtService: JwtService) {
            try {
                const user: Partial<Admin> = await jwtService.verify(token, {
                    secret: process.env.ACCESS_TOKEN_KEY,
                });
                if (!user.is_creator) {
                    throw new UnauthorizedException("Admin is not creator");
                }
                return true;
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        }
        return verify(token, this.jwtService);
    }
}
