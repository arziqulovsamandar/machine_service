"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const admin_module_1 = require("./admin/admin.module");
const client_module_1 = require("./client/client.module");
const admin_model_1 = require("./admin/model/admin.model");
const client_model_1 = require("./client/model/client.model");
const mail_module_1 = require("./mail/mail.module");
const order_module_1 = require("./order/order.module");
const order_model_1 = require("./order/model/order.model");
const region_module_1 = require("./region/region.module");
const manufacturer_module_1 = require("./manufacturer/manufacturer.module");
const parts_module_1 = require("./parts/parts.module");
const region_model_1 = require("./region/model/region.model");
const part_model_1 = require("./parts/model/part.model");
const manufacturer_model_1 = require("./manufacturer/model/manufacturer.model");
const mail_service_1 = require("./mail/mail.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: String(process.env.POSTGRES_PASSWORD),
                database: process.env.POSTGRES_DB,
                models: [admin_model_1.Admin, client_model_1.Client, order_model_1.Order, region_model_1.Region, part_model_1.Part, manufacturer_model_1.Manufacturer],
                autoLoadModels: true,
                logging: false,
            }),
            admin_module_1.AdminModule,
            client_module_1.ClientModule,
            mail_module_1.MailModule,
            order_module_1.OrderModule,
            region_module_1.RegionModule,
            manufacturer_module_1.ManufacturerModule,
            parts_module_1.PartsModule,
        ],
        controllers: [],
        providers: [mail_service_1.MailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map