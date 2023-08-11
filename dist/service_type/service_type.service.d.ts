import { CreateServiceTypeDto } from "./dto/create-service_type.dto";
import { UpdateServiceTypeDto } from "./dto/update-service_type.dto";
import { ServiceType } from "./model/service_type.model";
export declare class ServiceTypeService {
    private serviceTypeRepo;
    constructor(serviceTypeRepo: typeof ServiceType);
    create(createServiceTypeDto: CreateServiceTypeDto): Promise<{
        message: string;
        service_type: ServiceType;
    }>;
    findAll(): Promise<ServiceType[]>;
    findOne(id: number): Promise<ServiceType>;
    update(id: number, updateServiceTypeDto: UpdateServiceTypeDto): Promise<{
        message: string;
        updated: ServiceType;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
