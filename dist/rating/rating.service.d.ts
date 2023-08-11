import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./model/rating.model";
import { JwtService } from "@nestjs/jwt";
export declare class RatingService {
    private ratingRepo;
    private readonly jwtService;
    constructor(ratingRepo: typeof Rating, jwtService: JwtService);
    create(createRatingDto: CreateRatingDto, refreshToken: string): Promise<{
        message: string;
        rating: Rating;
    }>;
    findAll(): Promise<Rating[]>;
    findOne(id: number): Promise<Rating>;
    update(id: number, updateRatingDto: UpdateRatingDto, refreshToken: string): Promise<{
        message: string;
        updated: Rating;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
