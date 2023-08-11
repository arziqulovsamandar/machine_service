import { Model } from "sequelize-typescript";
import { Worker } from "../../worker/model/worker.model";
import { ServiceType } from "../../service_type/model/service_type.model";
interface ServicePriceAttr {
    worker_id: number;
    service_type_id: number;
    price: number;
}
export declare class ServicePrice extends Model<ServicePrice, ServicePriceAttr> {
    id: number;
    worker_id: number;
    service_type_id: number;
    price: number;
    worker: Worker;
    service_type: ServiceType;
}
export {};
