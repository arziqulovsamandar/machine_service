import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from './model/part.model';
export declare class PartsController {
    private readonly partsService;
    constructor(partsService: PartsService);
    findAll(): Promise<Part[]>;
    findOne(id: number): Promise<Part>;
    create(createServiceDto: CreatePartDto): Promise<Part>;
    update(id: number, updateTypeDto: UpdatePartDto): Promise<Part>;
    delete(id: number): Promise<void>;
}
