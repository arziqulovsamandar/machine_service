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
exports.Region = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../client/model/client.model");
let Region = exports.Region = class Region extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "UNIQUE ID" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Region.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "toshkent", description: "Foydalanuvchi viloyati" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Region.prototype, "viloyat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Olmazor", description: "Foydalanuvchi tumani" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Region.prototype, "tuman", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Mirzo Golib",
        description: "Foydalanuvchi mahalasi",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Region.prototype, "mahala", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => client_model_1.Client),
    __metadata("design:type", Array)
], Region.prototype, "client", void 0);
exports.Region = Region = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "region" })
], Region);
//# sourceMappingURL=region.model.js.map