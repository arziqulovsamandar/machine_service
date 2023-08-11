"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypeModule = void 0;
const common_1 = require("@nestjs/common");
const service_type_service_1 = require("./service_type.service");
const service_type_controller_1 = require("./service_type.controller");
const sequelize_1 = require("@nestjs/sequelize");
const service_type_model_1 = require("./model/service_type.model");
const jwt_1 = require("@nestjs/jwt");
let ServiceTypeModule = exports.ServiceTypeModule = class ServiceTypeModule {
};
exports.ServiceTypeModule = ServiceTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([service_type_model_1.ServiceType]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [service_type_controller_1.ServiceTypeController],
        providers: [service_type_service_1.ServiceTypeService],
    })
], ServiceTypeModule);
//# sourceMappingURL=service_type.module.js.map