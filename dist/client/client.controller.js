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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
const swagger_1 = require("@nestjs/swagger");
const cookieGetter_decorator_1 = require("../decorators/cookieGetter.decorator");
const client_model_1 = require("./model/client.model");
const login_client_dto_1 = require("./dto/login-client.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const admin_guard_1 = require("../guards/admin.guard");
const is_creator_guard_1 = require("../guards/is-creator.guard");
let ClientController = exports.ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    registration(createClientDto, res) {
        return this.clientService.registration(createClientDto, res);
    }
    login(loginClientDto, res) {
        return this.clientService.login(loginClientDto, res);
    }
    logout(refreshToken, res) {
        console.log(11);
        return this.clientService.logout(refreshToken, res);
    }
    findAll() {
        return this.clientService.findAll();
    }
    findOne(id) {
        return this.clientService.findOne(+id);
    }
    update(id, updateClientDto, refreshToken) {
        return this.clientService.update(+id, updateClientDto, refreshToken);
    }
    remove(id) {
        return this.clientService.remove(+id);
    }
    activate(link) {
        return this.clientService.activate(link);
    }
    refresh(id, refreshToken, res) {
        console.log(81);
        return this.clientService.refreshToken(+id, refreshToken, res);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yangi client qo'shish" }),
    (0, common_1.Post)("registration"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "registration", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Client tizimga kirishi" }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_client_dto_1.LoginClientDto, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Client tizimdan chiqishi" }),
    (0, common_1.Post)("logout"),
    __param(0, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "Clientlarni ko'rish" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "Clientni id orqali ko'rish" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "Clientni id orqali yangilash" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto, String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard, is_creator_guard_1.IsCreatorGuard),
    (0, swagger_1.ApiOperation)({ summary: "Clientni id orqali o'chirish" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Clientni activate qilish" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: client_model_1.Client }),
    (0, common_1.Get)("activate/:link"),
    __param(0, (0, common_1.Param)("link")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "activate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "Foydalanuvchi tokenini yangilash" }),
    (0, common_1.Post)("refresh/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "refresh", null);
exports.ClientController = ClientController = __decorate([
    (0, swagger_1.ApiTags)("Client"),
    (0, common_1.Controller)("client"),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map