import { WorkerService } from "./worker.service";
import { Worker } from "./model/worker.model";
export declare class ActivationController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    activate(link: string): Promise<{
        message: string;
        user: Worker;
    }>;
}
