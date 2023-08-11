import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./model/order.model";
import { JwtModule } from "@nestjs/jwt";
import { Client } from "../client/model/client.model";
import { Part } from "../parts/model/part.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Client,Part]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
