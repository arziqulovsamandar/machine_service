import { MailerService } from "@nestjs-modules/mailer";
import { Client } from "../client/model/client.model";
import { Admin } from "../admin/model/admin.model";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendClientConfirmation(client: Client): Promise<void>;
    sendAdminConfirmation(admin: Admin): Promise<void>;
}
