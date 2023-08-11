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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const swagger_1 = require("@nestjs/swagger");
const cookieGetter_decorator_1 = require("../decorators/cookieGetter.decorator");
const jwt_guard_1 = require("../guards/jwt.guard");
const client_guard_1 = require("../guards/client.guard");
const admin_guard_1 = require("../guards/admin.guard");
let CommentController = exports.CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(createCommentDto, refreshToken) {
        return this.commentService.create(createCommentDto, refreshToken);
    }
    findAll() {
        return this.commentService.findAll();
    }
    findOne(id) {
        return this.commentService.findOne(+id);
    }
    update(id, updateCommentDto, refreshToken) {
        return this.commentService.update(+id, updateCommentDto, refreshToken);
    }
    remove(id, refreshToken) {
        return this.commentService.remove(+id, refreshToken);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, client_guard_1.ClientGuard),
    (0, swagger_1.ApiOperation)({ summary: "Comment qo'shish" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: "Commentlarni ko'rish" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: "Commentni id orqali ko'rish" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, client_guard_1.ClientGuard),
    (0, swagger_1.ApiOperation)({ summary: "Commentni id orqali yangilash" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, client_guard_1.ClientGuard),
    (0, swagger_1.ApiOperation)({ summary: "Commentni id orqali o'chirish" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, cookieGetter_decorator_1.CookieGetter)("refresh_token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "remove", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)("Ishchilarga yozilgan commentlar"),
    (0, common_1.Controller)("comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map