import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, refreshToken: string): Promise<{
        message: string;
        comment: import("./model/comment.model").Comment;
    }>;
    findAll(): Promise<import("./model/comment.model").Comment[]>;
    findOne(id: string): Promise<import("./model/comment.model").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, refreshToken: string): Promise<{
        message: string;
        updated: import("./model/comment.model").Comment;
    }>;
    remove(id: string, refreshToken: string): Promise<{
        message: string;
    }>;
}
