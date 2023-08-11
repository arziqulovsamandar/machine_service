import { Model } from "sequelize-typescript";
import { Client } from "../../client/model/client.model";
import { Worker } from "../../worker/model/worker.model";
interface CommentAttr {
    worker_id: number;
    client_id: number;
    text: string;
}
export declare class Comment extends Model<Comment, CommentAttr> {
    id: number;
    worker_id: number;
    client_id: number;
    text: string;
    worker: Worker;
    client: Client;
}
export {};
