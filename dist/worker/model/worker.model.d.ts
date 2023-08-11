import { Model } from "sequelize-typescript";
import { ServicePrice } from "../../service_price/model/service_price.model";
import { Rating } from "../../rating/model/rating.model";
import { Comment } from "../../comment/model/comment.model";
interface WorkerAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    passport: string;
    is_active: boolean;
    email: string;
    password: string;
}
export declare class Worker extends Model<Worker, WorkerAttr> {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    passport: string;
    email: string;
    password: string;
    is_active: boolean;
    activation_link: string;
    refresh_token: string;
    average_rating: number;
    service_price: ServicePrice[];
    rating: Rating[];
    comments: Comment[];
}
export {};
