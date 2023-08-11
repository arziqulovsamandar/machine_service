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
exports.CreateWorkerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateWorkerDto {
}
exports.CreateWorkerDto = CreateWorkerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salim", description: "Worker ismi" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Salimov", description: "Worker familiyasi" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "+998901234567",
        description: "Worker telefon raqami",
    }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Qipchoq ko'chasi 34-2",
        description: "Worker manzili",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "AA 1234567",
        description: "Worker passport seriyasi va raqami",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "passport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "salim@gmail.com", description: "Worker emaili" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password", description: "Worker paroli" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "password", description: "Worker paroli" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "confirm_password", void 0);
//# sourceMappingURL=create-worker.dto.js.map