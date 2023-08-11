import { Model } from "sequelize-typescript";
import { Order } from "../../order/model/order.model";
import { Region } from "../../region/model/region.model";
interface ClientAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    region_id: number;
    location: string;
    email: string;
    password: string;
}
export declare class Client extends Model<Client, ClientAttr> {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    region_id: number;
    regions: Region;
    location: string;
    email: string;
    password: string;
    is_active: boolean;
    activation_link: string;
    refresh_token: string;
    orders: Order[];
}
export {};
