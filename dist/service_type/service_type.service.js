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
exports.ServiceTypeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const service_type_model_1 = require("./model/service_type.model");
let ServiceTypeService = exports.ServiceTypeService = class ServiceTypeService {
    constructor(serviceTypeRepo) {
        this.serviceTypeRepo = serviceTypeRepo;
    }
    async create(createServiceTypeDto) {
        const service_type = await this.serviceTypeRepo.create(createServiceTypeDto);
        if (service_type) {
            return {
                message: "Created",
                service_type,
            };
        }
        throw new common_1.HttpException("Server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll() {
        const service_types = await this.serviceTypeRepo.findAll({
            include: { all: true },
        });
        if (service_types.length > 0) {
            return service_types;
        }
        throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const service_type = await this.serviceTypeRepo.findByPk(id, {
            include: { all: true },
        });
        if (service_type) {
            return service_type;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateServiceTypeDto) {
        const service_type = await this.serviceTypeRepo.findByPk(id);
        if (service_type) {
            const updatedServiceType = await this.serviceTypeRepo.update(updateServiceTypeDto, {
                where: { id },
                returning: true,
            });
            if (updatedServiceType[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedServiceType[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id) {
        const deleted = await this.serviceTypeRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
};
exports.ServiceTypeService = ServiceTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(service_type_model_1.ServiceType)),
    __metadata("design:paramtypes", [Object])
], ServiceTypeService);
//# sourceMappingURL=service_type.service.js.map