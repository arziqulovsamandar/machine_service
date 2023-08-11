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
exports.Delivery = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const part_model_1 = require("../../parts/model/part.model");
let Delivery = exports.Delivery = class Delivery extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "UNIQUE ID" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12000", description: "price" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Delivery.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2022-02-20", description: "date" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Delivery.prototype, "delivery_date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => part_model_1.Part),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Number)
], Delivery.prototype, "service_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => part_model_1.Part),
    __metadata("design:type", part_model_1.Part)
], Delivery.prototype, "parts", void 0);
exports.Delivery = Delivery = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "delivery" })
], Delivery);
//# sourceMappingURL=deliverymodel.js.map