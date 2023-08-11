import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { Client } from "./model/client.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
import { Region } from "../region/model/region.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Client,Region]),
        JwtModule.register({}),
        MailModule,
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}
