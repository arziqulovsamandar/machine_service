import { Model } from "sequelize-typescript";
import { Client } from "../../client/model/client.model";
import { Part } from "../../parts/model/part.model";
interface OrderAttr {
    client_id: number;
    part_id: number;
    start_time: Date;
    end_time: Date;
    quantity: number;
    total_cost: number;
}
export declare class Order extends Model<Order, OrderAttr> {
    id: number;
    client_id: number;
    client: Client;
    start_time: Date;
    end_time: Date;
    quantity: number;
    total_cost: number;
    part_id: number;
    part: Part;
}
export {};
