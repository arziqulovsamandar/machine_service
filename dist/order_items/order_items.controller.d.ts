import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
export declare class OrderItemController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
    findAll(): Promise<import("./model/order_item.model").OrderItem[]>;
    findOne(id: number): Promise<import("./model/order_item.model").OrderItem>;
    create(createOrderItemDto: CreateOrderItemDto): Promise<import("./model/order_item.model").OrderItem>;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<import("./model/order_item.model").OrderItem>;
    delete(id: number): Promise<void>;
}
