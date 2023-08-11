"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let ClientGuard = exports.ClientGuard = class ClientGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        async function verify(token, jwtService) {
            try {
                const user = await jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY });
                if (user.role == "Client") {
                    return true;
                }
                throw new common_1.UnauthorizedException("User is not Client");
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        }
        return verify(token, this.jwtService);
    }
};
exports.ClientGuard = ClientGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ClientGuard);
//# sourceMappingURL=client.guard.js.map