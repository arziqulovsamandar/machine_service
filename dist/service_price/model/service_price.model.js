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
exports.ServicePrice = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const worker_model_1 = require("../../worker/model/worker.model");
const service_type_model_1 = require("../../service_type/model/service_type.model");
let ServicePrice = exports.ServicePrice = class ServicePrice extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ServicePrice.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Worker id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => worker_model_1.Worker),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ServicePrice.prototype, "worker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Service Type id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => service_type_model_1.ServiceType),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ServicePrice.prototype, "service_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80000, description: "Service narxi" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ServicePrice.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => worker_model_1.Worker),
    __metadata("design:type", worker_model_1.Worker)
], ServicePrice.prototype, "worker", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => service_type_model_1.ServiceType),
    __metadata("design:type", service_type_model_1.ServiceType)
], ServicePrice.prototype, "service_type", void 0);
exports.ServicePrice = ServicePrice = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "service_price" })
], ServicePrice);
//# sourceMappingURL=service_price.model.js.map