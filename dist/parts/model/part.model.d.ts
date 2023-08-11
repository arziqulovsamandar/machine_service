import { Model } from "sequelize-typescript";
import { Manufacturer } from "../../manufacturer/model/manufacturer.model";
import { Order } from "../../order/model/order.model";
interface PartAtr {
    name: string;
    description: string;
    price: number;
    manafucturer_id: number;
}
export declare class Part extends Model<Part, PartAtr> {
    id: number;
    name: string;
    price: number;
    description: string;
    manafucturer_id: number;
    manafacturer: Manufacturer;
    order: Order[];
}
export {};
