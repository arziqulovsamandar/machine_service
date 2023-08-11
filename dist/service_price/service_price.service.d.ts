import { CreateServicePriceDto } from "./dto/create-service_price.dto";
import { UpdateServicePriceDto } from "./dto/update-service_price.dto";
import { ServicePrice } from "../service_price/model/service_price.model";
import { JwtService } from "@nestjs/jwt";
export declare class ServicePriceService {
    private servicePriceRepo;
    private readonly jwtService;
    constructor(servicePriceRepo: typeof ServicePrice, jwtService: JwtService);
    create(createServicePriceDto: CreateServicePriceDto): Promise<{
        message: string;
        service_price: ServicePrice;
    }>;
    findAll(): Promise<ServicePrice[]>;
    findOne(id: number): Promise<ServicePrice>;
    update(id: number, updateServicePriceDto: UpdateServicePriceDto, refreshToken: string): Promise<{
        message: string;
        updated: ServicePrice;
    }>;
    remove(id: number, refreshToken: string): Promise<{
        message: string;
    }>;
}
