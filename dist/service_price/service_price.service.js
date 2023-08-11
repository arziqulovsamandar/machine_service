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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePriceService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const service_price_model_1 = require("../service_price/model/service_price.model");
const jwt_1 = require("@nestjs/jwt");
let ServicePriceService = exports.ServicePriceService = class ServicePriceService {
    constructor(servicePriceRepo, jwtService) {
        this.servicePriceRepo = servicePriceRepo;
        this.jwtService = jwtService;
    }
    async create(createServicePriceDto) {
        const service_price = await this.servicePriceRepo.create(createServicePriceDto);
        if (service_price) {
            return {
                message: "Created",
                service_price,
            };
        }
        throw new common_1.HttpException("Server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll() {
        const service_prices = await this.servicePriceRepo.findAll({
            include: { all: true },
        });
        if (service_prices.length > 0) {
            return service_prices;
        }
        throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const service_price = await this.servicePriceRepo.findByPk(id, {
            include: { all: true },
        });
        if (service_price) {
            return service_price;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateServicePriceDto, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        const service_price = await this.servicePriceRepo.findByPk(id);
        if (service_price.worker_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can update only your information");
        }
        if (service_price) {
            const updatedServicePrice = await this.servicePriceRepo.update(updateServicePriceDto, {
                where: { id },
                returning: true,
            });
            if (updatedServicePrice[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedServicePrice[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        const service_price = await this.servicePriceRepo.findByPk(id);
        if (service_price.worker_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can update only your rating");
        }
        const deleted = await this.servicePriceRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
};
exports.ServicePriceService = ServicePriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(service_price_model_1.ServicePrice)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], ServicePriceService);
//# sourceMappingURL=service_price.service.js.map