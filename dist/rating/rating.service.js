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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const rating_model_1 = require("./model/rating.model");
const jwt_1 = require("@nestjs/jwt");
let RatingService = exports.RatingService = class RatingService {
    constructor(ratingRepo, jwtService) {
        this.ratingRepo = ratingRepo;
        this.jwtService = jwtService;
    }
    async create(createRatingDto, refreshToken) {
        try {
            const decodedToken = this.jwtService.decode(refreshToken);
            const rating = await this.ratingRepo.create({
                ...createRatingDto,
                client_id: decodedToken.id,
            });
            if (rating) {
                return {
                    message: "Created",
                    rating,
                };
            }
            throw new common_1.HttpException("Server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        try {
            const ratings = await this.ratingRepo.findAll({
                include: { all: true },
            });
            if (ratings.length > 0) {
                return ratings;
            }
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        try {
            const rating = await this.ratingRepo.findByPk(id, {
                include: { all: true },
            });
            if (rating) {
                return rating;
            }
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateRatingDto, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        const rating = await this.ratingRepo.findByPk(id);
        if (rating.client_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can update only your rating");
        }
        if (rating) {
            const updatedRating = await this.ratingRepo.update(updateRatingDto, {
                where: { id },
                returning: true,
            });
            if (updatedRating[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedRating[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id) {
        const deleted = await this.ratingRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
};
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(rating_model_1.Rating)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], RatingService);
//# sourceMappingURL=rating.service.js.map