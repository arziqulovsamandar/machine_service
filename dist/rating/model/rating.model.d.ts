import { Model } from "sequelize-typescript";
import { Worker } from "../../worker/model/worker.model";
import { ServiceType } from "../../service_type/model/service_type.model";
import { Client } from "../../client/model/client.model";
interface RatingAttr {
    worker_id: number;
    client_id: number;
    service_type_id: number;
    rating: number;
}
export declare class Rating extends Model<Rating, RatingAttr> {
    id: number;
    worker_id: number;
    client_id: number;
    service_type_id: number;
    rating: number;
    worker: Worker;
    service_type: ServiceType;
    client: Client;
}
export {};
