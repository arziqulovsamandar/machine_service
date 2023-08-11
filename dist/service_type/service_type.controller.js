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
exports.ServiceTypeController = void 0;
const common_1 = require("@nestjs/common");
const service_type_service_1 = require("./service_type.service");
const create_service_type_dto_1 = require("./dto/create-service_type.dto");
const update_service_type_dto_1 = require("./dto/update-service_type.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../guards/jwt.guard");
const admin_guard_1 = require("../guards/admin.guard");
let ServiceTypeController = exports.ServiceTypeController = class ServiceTypeController {
    constructor(serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }
    create(createServiceTypeDto) {
        return this.serviceTypeService.create(createServiceTypeDto);
    }
    findAll() {
        return this.serviceTypeService.findAll();
    }
    findOne(id) {
        return this.serviceTypeService.findOne(+id);
    }
    update(id, updateServiceTypeDto) {
        return this.serviceTypeService.update(+id, updateServiceTypeDto);
    }
    remove(id) {
        return this.serviceTypeService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServiceType qo'shish" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_type_dto_1.CreateServiceTypeDto]),
    __metadata("design:returntype", void 0)
], ServiceTypeController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServiceTypelarni ko'rish" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServiceTypeni id orqali ko'rish" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServiceTypeni id orqali yangilash" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_type_dto_1.UpdateServiceTypeDto]),
    __metadata("design:returntype", void 0)
], ServiceTypeController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServiceTypeni id orqali o'chirish" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceTypeController.prototype, "remove", null);
exports.ServiceTypeController = ServiceTypeController = __decorate([
    (0, swagger_1.ApiTags)("Service turlari"),
    (0, common_1.Controller)("service-type"),
    __metadata("design:paramtypes", [service_type_service_1.ServiceTypeService])
], ServiceTypeController);
//# sourceMappingURL=service_type.controller.js.map