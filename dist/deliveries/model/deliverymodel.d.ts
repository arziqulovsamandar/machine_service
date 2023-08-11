import { Model } from "sequelize-typescript";
import { Part } from "../../parts/model/part.model";
interface DeliveryAtr {
    part_id: number;
    price: number;
    delivery_date: Date;
}
export declare class Delivery extends Model<Delivery, DeliveryAtr> {
    id: number;
    price: number;
    delivery_date: Date;
    service_id: number;
    parts: Part;
}
export {};
