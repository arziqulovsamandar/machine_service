import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "./admin/admin.module";
import { ClientModule } from "./client/client.module";
import { Admin } from "./admin/model/admin.model";
import { Client } from "./client/model/client.model";
import { MailModule } from "./mail/mail.module";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/model/order.model";

import { JwtModule } from "@nestjs/jwt";
import { RegionModule } from "./region/region.module";
import { ManufacturerModule } from "./manufacturer/manufacturer.module";
import { PartsModule } from "./parts/parts.module";
import { Region } from "./region/model/region.model";
import { Part } from "./parts/model/part.model";
import { Manufacturer } from "./manufacturer/model/manufacturer.model";
import { MailService } from "./mail/mail.service";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, Client, Order, Region, Part, Manufacturer],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    ClientModule,
    MailModule,
    OrderModule,
    RegionModule,
    ManufacturerModule,
    PartsModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
