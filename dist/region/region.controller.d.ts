import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./model/region.model";
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    findAll(): Promise<Region[]>;
    findOne(id: number): Promise<Region>;
    create(createServiceDto: CreateRegionDto): Promise<Region>;
    update(id: number, updateTypeDto: UpdateRegionDto): Promise<Region>;
    delete(id: number): Promise<void>;
}
