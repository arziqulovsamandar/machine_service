import { ClientService } from "./client.service";
import { Client } from "./model/client.model";
export declare class ActivationController {
    private readonly clientService;
    constructor(clientService: ClientService);
    activate(link: string): Promise<{
        message: string;
        user: Client;
    }>;
}
