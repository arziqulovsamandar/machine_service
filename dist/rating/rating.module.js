"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModule = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const rating_controller_1 = require("./rating.controller");
const sequelize_1 = require("@nestjs/sequelize");
const rating_model_1 = require("./model/rating.model");
const jwt_1 = require("@nestjs/jwt");
let RatingModule = exports.RatingModule = class RatingModule {
};
exports.RatingModule = RatingModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([rating_model_1.Rating]), jwt_1.JwtModule.register({})],
        controllers: [rating_controller_1.RatingController],
        providers: [rating_service_1.RatingService],
    })
], RatingModule);
//# sourceMappingURL=rating.module.js.map