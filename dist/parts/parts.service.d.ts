import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Part } from './model/part.model';
export declare class PartsService {
    private readonly regionModel;
    constructor(regionModel: typeof Part);
    findAll(): Promise<Part[]>;
    findOne(id: number): Promise<Part>;
    create(createPartDto: CreatePartDto): Promise<Part>;
    update(id: number, updatePartDto: UpdatePartDto): Promise<Part>;
    delete(id: number): Promise<void>;
}
