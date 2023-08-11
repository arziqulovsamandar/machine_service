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
exports.ActivationController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const swagger_1 = require("@nestjs/swagger");
const client_model_1 = require("./model/client.model");
let ActivationController = exports.ActivationController = class ActivationController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    activate(link) {
        return this.clientService.activate(link);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Clientni activate qilish" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: client_model_1.Client }),
    (0, common_1.Get)(":link"),
    __param(0, (0, common_1.Param)("link")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ActivationController.prototype, "activate", null);
exports.ActivationController = ActivationController = __decorate([
    (0, common_1.Controller)("activation"),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ActivationController);
//# sourceMappingURL=activation.controller.js.map