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
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const deliverymodel_1 = require("./model/deliverymodel");
let DeliveriesService = exports.DeliveriesService = class DeliveriesService {
    constructor(regionModel) {
        this.regionModel = regionModel;
    }
    async findAll() {
        return this.regionModel.findAll({ include: { all: true } });
    }
    async findOne(id) {
        return this.regionModel.findByPk(id);
    }
    async create(createDeliveryDto) {
        return this.regionModel.create(createDeliveryDto);
    }
    async update(id, updateDeliveryDto) {
        const builder = await this.regionModel.update(updateDeliveryDto, {
            where: { id },
            returning: true,
        });
        return builder[1][0].dataValues;
    }
    async delete(id) {
        const numRowsDeleted = await this.regionModel.destroy({
            where: { id },
        });
        if (numRowsDeleted === 0) {
            throw new Error(`Could not delete venue type with id ${id}`);
        }
    }
};
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(deliverymodel_1.Delivery)),
    __metadata("design:paramtypes", [Object])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map