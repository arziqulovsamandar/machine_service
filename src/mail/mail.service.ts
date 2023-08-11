import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Client } from "../client/model/client.model";
import { Admin } from "../admin/model/admin.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendClientConfirmation(client: Client): Promise<void> {
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
    } catch (error) {
      console.log(error);
    }
  }

  async sendAdminConfirmation(admin: Admin) {
      try {
          console.log(2);

          const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
          console.log(url);
          console.log(admin.email, admin.first_name);
          
          await this.mailerService.sendMail({

              to: admin.email,
              subject:
                  "Welcome to Cleaning Service as Admin! Confirm your Email",
              template: "./confirmation",
              context: {
                  name: admin.first_name,
                  url,
              },

          });
          console.log(3,url);

      } catch (error) {
          console.log(error);
      }
  }

}
