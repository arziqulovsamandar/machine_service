import { ServicePriceService } from "./service_price.service";
import { CreateServicePriceDto } from "./dto/create-service_price.dto";
import { UpdateServicePriceDto } from "./dto/update-service_price.dto";
export declare class ServicePriceController {
    private readonly servicePriceService;
    constructor(servicePriceService: ServicePriceService);
    create(createServicePriceDto: CreateServicePriceDto): Promise<{
        message: string;
        service_price: import("./model/service_price.model").ServicePrice;
    }>;
    findAll(): Promise<import("./model/service_price.model").ServicePrice[]>;
    findOne(id: string): Promise<import("./model/service_price.model").ServicePrice>;
    update(id: string, updateServicePriceDto: UpdateServicePriceDto, refreshToken: string): Promise<{
        message: string;
        updated: import("./model/service_price.model").ServicePrice;
    }>;
    remove(id: string, refreshToken: string): Promise<{
        message: string;
    }>;
}
