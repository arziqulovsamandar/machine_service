import { Model } from "sequelize-typescript";
import { Part } from "../../parts/model/part.model";
interface ManufacturerAtr {
    name: string;
    address: string;
    number: string;
}
export declare class Manufacturer extends Model<Manufacturer, ManufacturerAtr> {
    id: number;
    name: string;
    address: string;
    number: string;
    part: Part[];
}
export {};
