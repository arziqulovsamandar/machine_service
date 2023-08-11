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
exports.Part = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const manufacturer_model_1 = require("../../manufacturer/model/manufacturer.model");
const order_model_1 = require("../../order/model/order.model");
let Part = exports.Part = class Part extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "UNIQUE ID" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Part.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Sobir", description: "Foydalanuvchi ismi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Part.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12000", description: "price" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Part.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "txt", description: "description" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Part.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => manufacturer_model_1.Manufacturer),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Number)
], Part.prototype, "manafucturer_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => manufacturer_model_1.Manufacturer),
    __metadata("design:type", manufacturer_model_1.Manufacturer)
], Part.prototype, "manafacturer", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], Part.prototype, "order", void 0);
exports.Part = Part = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'part' })
], Part);
//# sourceMappingURL=part.model.js.map