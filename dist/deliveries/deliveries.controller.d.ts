import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './model/deliverymodel';
export declare class DeliveriesController {
    private readonly deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    findAll(): Promise<Delivery[]>;
    findOne(id: number): Promise<Delivery>;
    create(createServiceDto: CreateDeliveryDto): Promise<Delivery>;
    update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery>;
    delete(id: number): Promise<void>;
}
