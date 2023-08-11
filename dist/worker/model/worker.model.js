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
exports.Worker = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const service_price_model_1 = require("../../service_price/model/service_price.model");
const rating_model_1 = require("../../rating/model/rating.model");
const comment_model_1 = require("../../comment/model/comment.model");
let Worker = exports.Worker = class Worker extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Worker.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salim", description: "Worker ismi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salimov", description: "Worker familiyasi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+998901234567",
        description: "Worker telefon raqami",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Qaipchoq ko'chasi 34-2",
        description: "Worker manzili",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "AA 1234567",
        description: "Worker passport seriyasi va raqami",
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "passport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "salim@gmail.com", description: "Worker emaili" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password", description: "Worker paroli" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Worker.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Worker.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Worker.prototype, "activation_link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Worker.prototype, "refresh_token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Worker.prototype, "average_rating", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => service_price_model_1.ServicePrice),
    __metadata("design:type", Array)
], Worker.prototype, "service_price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rating_model_1.Rating),
    __metadata("design:type", Array)
], Worker.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comment_model_1.Comment),
    __metadata("design:type", Array)
], Worker.prototype, "comments", void 0);
exports.Worker = Worker = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "worker" })
], Worker);
//# sourceMappingURL=worker.model.js.map