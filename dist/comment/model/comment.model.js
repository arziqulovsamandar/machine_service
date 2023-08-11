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
exports.Comment = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../client/model/client.model");
const worker_model_1 = require("../../worker/model/worker.model");
let Comment = exports.Comment = class Comment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Worker id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => worker_model_1.Worker),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "worker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Client id" }),
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "client_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Kommentariya" }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => worker_model_1.Worker),
    __metadata("design:type", worker_model_1.Worker)
], Comment.prototype, "worker", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client),
    __metadata("design:type", client_model_1.Client)
], Comment.prototype, "client", void 0);
exports.Comment = Comment = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "comment" })
], Comment);
//# sourceMappingURL=comment.model.js.map