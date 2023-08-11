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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Worker id" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Part id" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "part_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2023-08-06",
        description: "Service boshlanish vaqti",
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2023-08-07", description: "Service tugash vaqti" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "nechtaligi" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200000, description: "narxi" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total_cost", void 0);
//# sourceMappingURL=create-order.dto.js.map