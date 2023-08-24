// import {
//     BadRequestException,
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { Client } from "../client/model/client.model";
// import { Model } from "sequelize-typescript";

// interface ClientGuardAttr extends Model<Client> {
//     role: string;
// }

// @Injectable()
// export class ClientGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) {}

//     canActivate(context: ExecutionContext) {
//         const req = context.switchToHttp().getRequest();
//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(" ")[1];


//        console.log("TOKEN",token,"athHEADER",authHeader,"REQ",req);
       
//         async function verify(token: string, jwtService: JwtService) {
//             try {
//                 const user: Partial<ClientGuardAttr> = await jwtService.verify(
//                     token,
//                     { secret: process.env.ACCESS_TOKEN_KEY }
//                 );
//                 if (user.role == "Client") {
//                     return true;
//                 }
//                 throw new UnauthorizedException("User is not Client");
//             } catch (error) {
//                 throw new BadRequestException(error.message);
//             }
//         }
//         return verify(token, this.jwtService);
//     }
// }
