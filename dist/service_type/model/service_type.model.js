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
exports.ServiceType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const service_price_model_1 = require("../../service_price/model/service_price.model");
const rating_model_1 = require("../../rating/model/rating.model");
const order_model_1 = require("../../order/model/order.model");
let ServiceType = exports.ServiceType = class ServiceType extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], ServiceType.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ServiceType.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => service_price_model_1.ServicePrice),
    __metadata("design:type", Array)
], ServiceType.prototype, "service_price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rating_model_1.Rating),
    __metadata("design:type", Array)
], ServiceType.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], ServiceType.prototype, "orders", void 0);
exports.ServiceType = ServiceType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "service_type" })
], ServiceType);
//# sourceMappingURL=service_type.model.js.map