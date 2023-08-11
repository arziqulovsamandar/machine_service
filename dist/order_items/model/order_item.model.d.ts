import { Model } from "sequelize-typescript";
import { Order } from "../../order/model/order.model";
import { Part } from "../../parts/model/part.model";
interface OrderItemAtr {
    order_id: number;
    part_id: number;
    price: number;
}
export declare class OrderItem extends Model<OrderItem, OrderItemAtr> {
    id: number;
    price: number;
    order_id: number;
    orders: Order;
    service_id: number;
    parts: Part;
}
export {};
