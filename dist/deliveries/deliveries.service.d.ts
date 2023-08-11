import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './model/deliverymodel';
export declare class DeliveriesService {
    private readonly regionModel;
    constructor(regionModel: typeof Delivery);
    findAll(): Promise<Delivery[]>;
    findOne(id: number): Promise<Delivery>;
    create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery>;
    update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery>;
    delete(id: number): Promise<void>;
}
