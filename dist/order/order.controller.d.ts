import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<import("./model/order.model").Order[]>;
    findOne(id: number): Promise<import("./model/order.model").Order>;
    create(createServiceDto: CreateOrderDto): Promise<import("./model/order.model").Order>;
    update(id: number, updateTypeDto: UpdateOrderDto): Promise<import("./model/order.model").Order>;
    delete(id: number): Promise<void>;
}
