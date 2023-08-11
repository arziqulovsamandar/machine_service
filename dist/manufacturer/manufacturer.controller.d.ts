import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './model/manufacturer.model';
export declare class ManufacturerController {
    private readonly manufacturerService;
    constructor(manufacturerService: ManufacturerService);
    findAll(): Promise<Manufacturer[]>;
    findOne(id: number): Promise<Manufacturer>;
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    update(id: number, updateManufacturerDto: UpdateManufacturerDto): Promise<Manufacturer>;
    delete(id: number): Promise<void>;
}
