import { ActivationService } from "./activation.service";
import { CreateActivationDto } from "./dto/create-activation.dto";
export declare class ActivationController {
    private readonly activationService;
    constructor(activationService: ActivationService);
    create(createActivationDto: CreateActivationDto): void;
}
