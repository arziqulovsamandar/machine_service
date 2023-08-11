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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("./model/admin.model");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminRepo, jwtService, mailService) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async registration(createAdminDto, res) {
        const admin = await this.adminRepo.findOne({
            where: { email: createAdminDto.email },
        });
        if (admin) {
            throw new common_1.BadRequestException("Email already exists");
        }
        if (createAdminDto.password !== createAdminDto.confirm_password) {
            throw new common_1.BadRequestException("Passwords is not matched");
        }
        const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
        const newAdmin = await this.adminRepo.create({
            ...createAdminDto,
            password: hashed_password,
        });
        const tokens = await this.getTokens(newAdmin);
        const uniqueKey = (0, uuid_1.v4)();
        const updatedAdmin = await this.hashRefeshToken(tokens.refresh_token, newAdmin, res, uniqueKey);
        try {
            console.log(updatedAdmin[1][0]);
            await this.mailService.sendAdminConfirmation(updatedAdmin[1][0].dataValues);
        }
        catch (error) {
            console.log(error);
        }
        const response = {
            message: "Admin registered",
            admin: updatedAdmin[1][0],
            tokens,
        };
        return response;
    }
    async getTokens(admin) {
        const jwtPayload = {
            id: admin.id,
            is_active: admin.is_active,
            name: admin.first_name,
            is_creator: admin.is_creator,
            role: "Admin",
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
    async hashRefeshToken(refresh_token, admin, res, uniqueKey) {
        const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
        if (uniqueKey) {
            const updatedAdmin = await this.adminRepo.update({
                refresh_token: hashed_refresh_token,
                activation_link: uniqueKey,
            }, { where: { id: admin.dataValues.id }, returning: true });
            res.cookie("refresh_token", refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return updatedAdmin;
        }
        const updatedAdmin = await this.adminRepo.update({ refresh_token: hashed_refresh_token }, { where: { id: admin.id }, returning: true });
        res.cookie("refresh_token", refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return updatedAdmin;
    }
    async login(loginAdminDto, res) {
        const { email, password } = loginAdminDto;
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
            throw new common_1.UnauthorizedException("Admin is not registered");
        }
        const isMatchPass = await bcrypt.compare(password, admin.password);
        if (!isMatchPass) {
            throw new common_1.UnauthorizedException("Admin is not registered(pass");
        }
        const tokens = await this.getTokens(admin);
        const updatedAdmin = await this.hashRefeshToken(tokens.refresh_token, admin, res);
        const response = {
            message: "Admin logged in",
            admin: updatedAdmin[1][0],
            tokens,
        };
        return response;
    }
    async logout(refreshToken, res) {
        console.log(34);
        const adminData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        console.log(12);
        if (!adminData) {
            throw new common_1.ForbiddenException("Admin not found");
        }
        const updatedAdmin = await this.adminRepo.update({ refresh_token: null }, { where: { id: adminData.id }, returning: true });
        console.log(updatedAdmin);
        res.clearCookie("refresh_token");
        const response = {
            message: "Admin logged out successfully",
            admin: updatedAdmin[1][0],
        };
        return response;
    }
    async refreshToken(admin_id, refreshToken, res) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (admin_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("Admin not found 1");
        }
        const admin = await this.adminRepo.findOne({
            where: { id: admin_id },
        });
        if (!admin) {
            throw new common_1.BadRequestException("Admin not found");
        }
        const tokenMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
        if (!tokenMatch) {
            throw new common_1.ForbiddenException("Forbidden");
        }
        const tokens = await this.getTokens(admin);
        const updatedAdmin = await this.hashRefeshToken(refreshToken, admin, res);
        const response = {
            message: "Admin refreshed",
            admin: updatedAdmin[1][0],
            tokens,
        };
        return response;
    }
    async findAll() {
        const admins = await this.adminRepo.findAll();
        if (admins.length > 0) {
            return admins;
        }
        throw new common_1.HttpException("Not found", common_1.HttpStatus.NOT_FOUND);
    }
    async findOne(id) {
        const admin = await this.adminRepo.findByPk(id);
        if (admin) {
            return admin;
        }
        throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateAdminDto) {
        const admin = await this.adminRepo.findByPk(id);
        if (admin) {
            const updatedAdmin = await this.adminRepo.update(updateAdminDto, {
                where: { id },
                returning: true,
            });
            if (updatedAdmin[0]) {
                return {
                    message: "Updated succesfully",
                    updated: updatedAdmin[1][0].dataValues,
                };
            }
            throw new common_1.BadRequestException("Did not updated");
        }
        else {
            throw new common_1.HttpException("Not found with such id", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(id) {
        const deleted = await this.adminRepo.destroy({
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
        const updatedAdmin = await this.adminRepo.update({ is_active: true }, {
            where: { activation_link: link, is_active: false },
            returning: true,
        });
        if (!updatedAdmin[1][0]) {
            throw new common_1.BadRequestException("Admin already activated");
        }
        const response = {
            message: "Admin activated successfully",
            admin: updatedAdmin[1][0],
        };
        return response;
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService])
], AdminService);
//# sourceMappingURL=admin.service.js.map