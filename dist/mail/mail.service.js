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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = exports.MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendClientConfirmation(client) {
        try {
            const url = `${process.env.API_HOST}/api/client/activate/${client.activation_link}`;
            await this.mailerService.sendMail({
                to: client.email,
                subject: "Welcome to Cleaning Service as Client! Confirm your Email",
                template: "./confirmation",
                context: {
                    name: client.first_name,
                    url,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendAdminConfirmation(admin) {
        try {
            console.log(2);
            const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
            console.log(url);
            console.log(admin.email, admin.first_name);
            await this.mailerService.sendMail({
                to: admin.email,
                subject: "Welcome to Cleaning Service as Admin! Confirm your Email",
                template: "./confirmation",
                context: {
                    name: admin.first_name,
                    url,
                },
            });
            console.log(3, url);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map