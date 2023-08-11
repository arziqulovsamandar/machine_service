import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./model/region.model";
export declare class RegionService {
    private readonly regionModel;
    constructor(regionModel: typeof Region);
    findAll(): Promise<Region[]>;
    findOne(id: number): Promise<Region>;
    create(createServiceDto: CreateRegionDto): Promise<Region>;
    update(id: number, updateServiceDto: UpdateRegionDto): Promise<Region>;
    delete(id: number): Promise<void>;
}
