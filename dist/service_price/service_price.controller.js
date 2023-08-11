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
exports.ServicePriceController = void 0;
const common_1 = require("@nestjs/common");
const service_price_service_1 = require("./service_price.service");
const create_service_price_dto_1 = require("./dto/create-service_price.dto");
const update_service_price_dto_1 = require("./dto/update-service_price.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../guards/jwt.guard");
const worker_guard_1 = require("../guards/worker.guard");
const admin_guard_1 = require("../guards/admin.guard");
const cookieGetter_decorator_1 = require("../decorators/cookieGetter.decorator");
let ServicePriceController = exports.ServicePriceController = class ServicePriceController {
    constructor(servicePriceService) {
        this.servicePriceService = servicePriceService;
    }
    create(createServicePriceDto) {
        return this.servicePriceService.create(createServicePriceDto);
    }
    findAll() {
        return this.servicePriceService.findAll();
    }
    findOne(id) {
        return this.servicePriceService.findOne(+id);
    }
    update(id, updateServicePriceDto, refreshToken) {
        return this.servicePriceService.update(+id, updateServicePriceDto, refreshToken);
    }
    remove(id, refreshToken) {
        return this.servicePriceService.remove(+id, refreshToken);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, worker_guard_1.WorkerGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServicePrice qo'shish" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_price_dto_1.CreateServicePriceDto]),
    __metadata("design:returntype", void 0)
], ServicePriceController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServicePricelarni ko'rish" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicePriceController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServicePriceni id orqali ko'rish" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicePriceController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, worker_guard_1.WorkerGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServicePriceni id orqali yangilash" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_price_dto_1.UpdateServicePriceDto, String]),
    __metadata("design:returntype", void 0)
], ServicePriceController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, worker_guard_1.WorkerGuard),
    (0, swagger_1.ApiOperation)({ summary: "ServicePriceni id orqali o'chirish" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ServicePriceController.prototype, "remove", null);
exports.ServicePriceController = ServicePriceController = __decorate([
    (0, swagger_1.ApiTags)("Service narxlari"),
    (0, common_1.Controller)("service-price"),
    __metadata("design:paramtypes", [service_price_service_1.ServicePriceService])
], ServicePriceController);
//# sourceMappingURL=service_price.controller.js.map