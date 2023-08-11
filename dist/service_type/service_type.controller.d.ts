import { ServiceTypeService } from "./service_type.service";
import { CreateServiceTypeDto } from "./dto/create-service_type.dto";
import { UpdateServiceTypeDto } from "./dto/update-service_type.dto";
export declare class ServiceTypeController {
    private readonly serviceTypeService;
    constructor(serviceTypeService: ServiceTypeService);
    create(createServiceTypeDto: CreateServiceTypeDto): Promise<{
        message: string;
        service_type: import("./model/service_type.model").ServiceType;
    }>;
    findAll(): Promise<import("./model/service_type.model").ServiceType[]>;
    findOne(id: string): Promise<import("./model/service_type.model").ServiceType>;
    update(id: string, updateServiceTypeDto: UpdateServiceTypeDto): Promise<{
        message: string;
        updated: import("./model/service_type.model").ServiceType;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
