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
exports.Client = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("../../order/model/order.model");
const region_model_1 = require("../../region/model/region.model");
let Client = exports.Client = class Client extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salim", description: "Client ismi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salimov", description: "Client familiyasi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+998901234567",
        description: "Client telefon raqami",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Qaipchoq ko'chasi 34-2",
        description: "Client manzili",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => region_model_1.Region),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Number)
], Client.prototype, "region_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => region_model_1.Region),
    __metadata("design:type", region_model_1.Region)
], Client.prototype, "regions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "link", description: "Client lokatsiyasi linki" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "salim@gmail.com", description: "Client emaili" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password", description: "Client paroli" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Client.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Client.prototype, "activation_link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Client.prototype, "refresh_token", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], Client.prototype, "orders", void 0);
exports.Client = Client = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "client" })
], Client);
//# sourceMappingURL=client.model.js.map