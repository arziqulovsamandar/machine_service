import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./model/order.model";
export declare class OrderService {
    private readonly regionModel;
    constructor(regionModel: typeof Order);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    delete(id: number): Promise<void>;
}
