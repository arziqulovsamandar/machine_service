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
exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../client/model/client.model");
const part_model_1 = require("../../parts/model/part.model");
let Order = exports.Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Client id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "client_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client),
    __metadata("design:type", client_model_1.Client)
], Order.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2023-08-06",
        description: "Service boshlanish vaqti",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Order.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2023-08-06",
        description: "Service tugash vaqti",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Order.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2", description: "mahsulot soni" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2", description: "narxi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "total_cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "part id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => part_model_1.Part),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "part_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => part_model_1.Part),
    __metadata("design:type", part_model_1.Part)
], Order.prototype, "part", void 0);
exports.Order = Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "order" })
], Order);
//# sourceMappingURL=order.model.js.map