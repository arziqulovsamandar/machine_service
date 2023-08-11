import { RatingService } from "./rating.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    create(createRatingDto: CreateRatingDto, refreshToken: string): Promise<{
        message: string;
        rating: import("./model/rating.model").Rating;
    }>;
    findAll(): Promise<import("./model/rating.model").Rating[]>;
    findOne(id: string): Promise<import("./model/rating.model").Rating>;
    update(id: string, updateRatingDto: UpdateRatingDto, refreshToken: string): Promise<{
        message: string;
        updated: import("./model/rating.model").Rating;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
