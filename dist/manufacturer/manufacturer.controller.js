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
exports.ManufacturerController = void 0;
const common_1 = require("@nestjs/common");
const manufacturer_service_1 = require("./manufacturer.service");
const create_manufacturer_dto_1 = require("./dto/create-manufacturer.dto");
const update_manufacturer_dto_1 = require("./dto/update-manufacturer.dto");
const swagger_1 = require("@nestjs/swagger");
let ManufacturerController = exports.ManufacturerController = class ManufacturerController {
    constructor(manufacturerService) {
        this.manufacturerService = manufacturerService;
    }
    async findAll() {
        return this.manufacturerService.findAll();
    }
    async findOne(id) {
        return this.manufacturerService.findOne(id);
    }
    async create(createManufacturerDto) {
        return this.manufacturerService.create(createManufacturerDto);
    }
    async update(id, updateManufacturerDto) {
        return this.manufacturerService.update(id, updateManufacturerDto);
    }
    async delete(id) {
        return this.manufacturerService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "All Region" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Id Serach Region" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create Region" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manufacturer_dto_1.CreateManufacturerDto]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Region" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_manufacturer_dto_1.UpdateManufacturerDto]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete Region" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "delete", null);
exports.ManufacturerController = ManufacturerController = __decorate([
    (0, common_1.Controller)("manufacturer"),
    __metadata("design:paramtypes", [manufacturer_service_1.ManufacturerService])
], ManufacturerController);
//# sourceMappingURL=manufacturer.controller.js.map