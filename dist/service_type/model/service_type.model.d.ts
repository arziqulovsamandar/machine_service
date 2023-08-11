import { Model } from "sequelize-typescript";
import { ServicePrice } from "../../service_price/model/service_price.model";
import { Rating } from "../../rating/model/rating.model";
import { Order } from "../../order/model/order.model";
interface ServiceTypeAttr {
    name: string;
}
export declare class ServiceType extends Model<ServiceType, ServiceTypeAttr> {
    id: number;
    name: string;
    service_price: ServicePrice[];
    rating: Rating[];
    orders: Order[];
}
export {};
