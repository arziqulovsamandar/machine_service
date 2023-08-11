import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginClientDto {
    @ApiProperty({
        example: "email1@gmail.com",
        description: "Foydalanuvchi elektron pochtasi",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "password",
        description: "Foydalanuvchi paroli",
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
