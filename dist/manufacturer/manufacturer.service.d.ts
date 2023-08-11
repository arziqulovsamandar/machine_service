import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './model/manufacturer.model';
export declare class ManufacturerService {
    private readonly manufacturerModel;
    constructor(manufacturerModel: typeof Manufacturer);
    findAll(): Promise<Manufacturer[]>;
    findOne(id: number): Promise<Manufacturer>;
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    update(id: number, updateManufacturerDto: UpdateManufacturerDto): Promise<Manufacturer>;
    delete(id: number): Promise<void>;
}
