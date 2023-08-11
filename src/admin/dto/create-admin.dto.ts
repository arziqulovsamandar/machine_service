import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ example: "Salim", description: "Admin ismi" })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: "Salimov", description: "Admin familiyasi" })
    last_name: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Admin telefon raqami",
    })
    @IsPhoneNumber()
    phone_number: string;

    @ApiProperty({ example: "salim@gmail.com", description: "Admin emaili" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "password", description: "Admin paroli" })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "confirm_password", description: "Admin paroli" })
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
