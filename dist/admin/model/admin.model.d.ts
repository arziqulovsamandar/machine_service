import { Model } from "sequelize-typescript";
interface AdminAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    is_active: boolean;
    is_creator: boolean;
}
export declare class Admin extends Model<Admin, AdminAttr> {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    activation_link: string;
    is_active: boolean;
    is_creator: boolean;
    refresh_token: string;
}
export {};
