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
exports.DeliveriesController = void 0;
const common_1 = require("@nestjs/common");
const deliveries_service_1 = require("./deliveries.service");
const create_delivery_dto_1 = require("./dto/create-delivery.dto");
const update_delivery_dto_1 = require("./dto/update-delivery.dto");
const swagger_1 = require("@nestjs/swagger");
let DeliveriesController = exports.DeliveriesController = class DeliveriesController {
    constructor(deliveriesService) {
        this.deliveriesService = deliveriesService;
    }
    async findAll() {
        return this.deliveriesService.findAll();
    }
    async findOne(id) {
        return this.deliveriesService.findOne(id);
    }
    async create(createServiceDto) {
        return this.deliveriesService.create(createServiceDto);
    }
    async update(id, updateDeliveryDto) {
        return this.deliveriesService.update(id, updateDeliveryDto);
    }
    async delete(id) {
        return this.deliveriesService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "All Delivery" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliveriesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Id Serach Delivery" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeliveriesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create Delivery" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_dto_1.CreateDeliveryDto]),
    __metadata("design:returntype", Promise)
], DeliveriesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Delivery" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_delivery_dto_1.UpdateDeliveryDto]),
    __metadata("design:returntype", Promise)
], DeliveriesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete Delivery" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeliveriesController.prototype, "delete", null);
exports.DeliveriesController = DeliveriesController = __decorate([
    (0, common_1.Controller)("deliveries"),
    __metadata("design:paramtypes", [deliveries_service_1.DeliveriesService])
], DeliveriesController);
//# sourceMappingURL=deliveries.controller.js.map