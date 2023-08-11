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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const comment_model_1 = require("./model/comment.model");
let CommentService = exports.CommentService = class CommentService {
    constructor(commentRepo, jwtService) {
        this.commentRepo = commentRepo;
        this.jwtService = jwtService;
    }
    async create(createCommentDto, refreshToken) {
        try {
            const decodedToken = this.jwtService.decode(refreshToken);
            const comment = await this.commentRepo.create({
                ...createCommentDto,
                client_id: decodedToken.id,
            });
            if (comment) {
                return {
                    message: "Created",
                    comment,
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
            const comments = await this.commentRepo.findAll({
                include: { all: true },
            });
            if (comments.length > 0) {
                return comments;
            }
            throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        const comment = await this.commentRepo.findByPk(id, {
            include: { all: true },
        });
        if (comment) {
            return comment;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateCommentDto, refreshToken) {
        try {
            const decodedToken = this.jwtService.decode(refreshToken);
            const comment = await this.commentRepo.findOne({ where: { id } });
            if (comment.client_id != decodedToken["id"]) {
                throw new common_1.BadRequestException("You can update only your information");
            }
            if (comment) {
                const updatedComment = await this.commentRepo.update(updateCommentDto, {
                    where: { id },
                    returning: true,
                });
                if (updatedComment[0]) {
                    return {
                        message: "Updated succesfully",
                        updated: updatedComment[1][0].dataValues,
                    };
                }
                throw new common_1.BadRequestException("Did not updated");
            }
            else {
                throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(id, refreshToken) {
        try {
            const comment = await this.commentRepo.findOne({ where: { id } });
            const decodedToken = this.jwtService.decode(refreshToken);
            if (comment.client_id != decodedToken["id"]) {
                throw new common_1.BadRequestException("You can update only your information");
            }
            const deleted = await this.commentRepo.destroy({
                where: { id },
            });
            if (deleted) {
                return { message: "Deleted succesfully" };
            }
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comment_model_1.Comment)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], CommentService);
//# sourceMappingURL=comment.service.js.map