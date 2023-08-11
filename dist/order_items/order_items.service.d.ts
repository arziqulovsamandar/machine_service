import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { OrderItem } from './model/order_item.model';
export declare class OrderItemsService {
    private readonly orderItemModel;
    constructor(orderItemModel: typeof OrderItem);
    findAll(): Promise<OrderItem[]>;
    findOne(id: number): Promise<OrderItem>;
    create(createOrderDto: CreateOrderItemDto): Promise<OrderItem>;
    update(id: number, updateOrderDto: UpdateOrderItemDto): Promise<OrderItem>;
    delete(id: number): Promise<void>;
}
