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
exports.OrderItemController = void 0;
const common_1 = require("@nestjs/common");
const order_items_service_1 = require("./order_items.service");
const create_order_item_dto_1 = require("./dto/create-order_item.dto");
const update_order_item_dto_1 = require("./dto/update-order_item.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderItemController = exports.OrderItemController = class OrderItemController {
    constructor(orderItemsService) {
        this.orderItemsService = orderItemsService;
    }
    async findAll() {
        return this.orderItemsService.findAll();
    }
    async findOne(id) {
        return this.orderItemsService.findOne(id);
    }
    async create(createOrderItemDto) {
        return this.orderItemsService.create(createOrderItemDto);
    }
    async update(id, updateOrderItemDto) {
        return this.orderItemsService.update(id, updateOrderItemDto);
    }
    async delete(id) {
        return this.orderItemsService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "All OrderItem" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Id Serach OrderItem" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create OrderItem" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_item_dto_1.CreateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update OrderItem" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_item_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete OrderItem" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "delete", null);
exports.OrderItemController = OrderItemController = __decorate([
    (0, common_1.Controller)("order-items"),
    __metadata("design:paramtypes", [order_items_service_1.OrderItemsService])
], OrderItemController);
//# sourceMappingURL=order_items.controller.js.map