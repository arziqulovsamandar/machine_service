import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { JwtService } from "@nestjs/jwt";
import { Comment } from "./model/comment.model";
export declare class CommentService {
    private commentRepo;
    private readonly jwtService;
    constructor(commentRepo: typeof Comment, jwtService: JwtService);
    create(createCommentDto: CreateCommentDto, refreshToken: string): Promise<{
        message: string;
        comment: Comment;
    }>;
    findAll(): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto, refreshToken: string): Promise<{
        message: string;
        updated: Comment;
    }>;
    remove(id: number, refreshToken: string): Promise<{
        message: string;
    }>;
}
