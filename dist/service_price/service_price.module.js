"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePriceModule = void 0;
const common_1 = require("@nestjs/common");
const service_price_service_1 = require("./service_price.service");
const service_price_controller_1 = require("./service_price.controller");
const sequelize_1 = require("@nestjs/sequelize");
const service_price_model_1 = require("./model/service_price.model");
const jwt_1 = require("@nestjs/jwt");
let ServicePriceModule = exports.ServicePriceModule = class ServicePriceModule {
};
exports.ServicePriceModule = ServicePriceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([service_price_model_1.ServicePrice]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [service_price_controller_1.ServicePriceController],
        providers: [service_price_service_1.ServicePriceService],
    })
], ServicePriceModule);
//# sourceMappingURL=service_price.module.js.map