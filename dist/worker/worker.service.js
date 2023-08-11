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
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const sequelize_1 = require("@nestjs/sequelize");
const worker_model_1 = require("./model/worker.model");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
let WorkerService = exports.WorkerService = class WorkerService {
    constructor(clientRepo, jwtService, mailService) {
        this.clientRepo = clientRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registration(createWorkerDto, res) {
        const worker = await this.clientRepo.findOne({
            where: { email: createWorkerDto.email },
        });
        if (worker) {
            throw new common_1.BadRequestException("Email already exists");
        }
        if (createWorkerDto.password !== createWorkerDto.confirm_password) {
            throw new common_1.BadRequestException("Passwords is not matched");
        }
        const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
        const newWorker = await this.clientRepo.create({
            ...createWorkerDto,
            password: hashed_password,
        });
        const tokens = await this.getTokens(newWorker);
        const uniqueKey = (0, uuid_1.v4)();
        const updatedWorker = await this.hashRefeshToken(tokens.refresh_token, newWorker, res, uniqueKey);
        try {
            await this.mailService.sendWorkerConfirmation(updatedWorker[1][0]);
        }
        catch (error) {
            console.log(error);
        }
        const response = {
            message: "Clinet registered",
            worker: updatedWorker[1][0],
            tokens,
        };
        return response;
    }
    async getTokens(worker) {
        const jwtPayload = {
            id: worker.id,
            is_active: worker.is_active,
            name: worker.first_name,
            role: "Worker",
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async hashRefeshToken(refresh_token, worker, res, uniqueKey) {
        const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
        if (uniqueKey) {
            const updatedWorker = await this.clientRepo.update({
                refresh_token: hashed_refresh_token,
                activation_link: uniqueKey,
            }, { where: { id: worker.dataValues.id }, returning: true });
            res.cookie("refresh_token", refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return updatedWorker;
        }
        const updatedWorker = await this.clientRepo.update({ refresh_token: hashed_refresh_token }, { where: { id: worker.id }, returning: true });
        res.cookie("refresh_token", refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return updatedWorker;
    }
    async login(loginWorkerDto, res) {
        const { email, password } = loginWorkerDto;
        const worker = await this.clientRepo.findOne({ where: { email } });
        if (!worker) {
            throw new common_1.UnauthorizedException("Worker is not registered");
        }
        const isMatchPass = await bcrypt.compare(password, worker.password);
        if (!isMatchPass) {
            throw new common_1.UnauthorizedException("Worker is not registered(pass");
        }
        const tokens = await this.getTokens(worker);
        const updatedWorker = await this.hashRefeshToken(tokens.refresh_token, worker, res);
        const response = {
            message: "Clinet logged in",
            worker: updatedWorker[1][0],
            tokens,
        };
        return response;
    }
    async logout(refreshToken, res) {
        const workerData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if (!workerData) {
            throw new common_1.ForbiddenException("Worker not found");
        }
        const updatedWorker = await this.clientRepo.update({ refresh_token: null }, { where: { id: workerData.id }, returning: true });
        res.clearCookie("refresh_token");
        const response = {
            message: "Worker logged out successfullu",
            worker: updatedWorker[1][0],
        };
        return response;
    }
    async refreshToken(worker_id, refreshToken, res) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (worker_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("Worker not found 1");
        }
        const worker = await this.clientRepo.findOne({
            where: { id: worker_id },
        });
        if (!worker) {
            throw new common_1.BadRequestException("Worker not found");
        }
        const tokenMatch = await bcrypt.compare(refreshToken, worker.refresh_token);
        if (!tokenMatch) {
            throw new common_1.ForbiddenException("Forbidden");
        }
        const tokens = await this.getTokens(worker);
        const updatedWorker = this.hashRefeshToken(refreshToken, worker, res);
        const response = {
            message: "Worker refreshed",
            worker: updatedWorker[1][0],
            tokens,
        };
        return response;
    }
    async findAll() {
        const clients = await this.clientRepo.findAll({
            include: { all: true },
        });
        if (clients.length > 0) {
            return clients;
        }
        throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const worker = await this.clientRepo.findByPk(id, {
            include: { all: true },
        });
        if (worker) {
            return worker;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateWorkerDto, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can update only your information");
        }
        const worker = await this.clientRepo.findByPk(id);
        if (worker) {
            const updatedWorker = await this.clientRepo.update(updateWorkerDto, {
                where: { id },
                returning: true,
            });
            if (updatedWorker[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedWorker[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id, refreshToken) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (id != decodedToken["id"]) {
            throw new common_1.BadRequestException("You can delete only yourself");
        }
        const deleted = await this.clientRepo.destroy({
            where: { id },
        });
        if (deleted) {
            return { message: "Deleted succesfully" };
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async activate(link) {
        if (!link) {
            throw new common_1.BadRequestException("Activation link not found");
        }
        const updatedWorker = await this.clientRepo.update({ is_active: true }, {
            where: { activation_link: link, is_active: false },
            returning: true,
        });
        if (!updatedWorker[1][0]) {
            throw new common_1.BadRequestException("Worker already activated");
        }
        const response = {
            message: "Worker activated successfully",
            worker: updatedWorker[1][0],
        };
        return response;
    }
};
exports.WorkerService = WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(worker_model_1.Worker)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService])
], WorkerService);
//# sourceMappingURL=worker.service.js.map