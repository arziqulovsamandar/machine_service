import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPhoneNumber, IsEmail, IsOptional } from "class-validator";

export class UpdateClientDto {
    @ApiProperty({ example: "Salim", description: "Client ismi" })
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiProperty({ example: "Salimov", description: "Client familiyasi" })
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Client telefon raqami",
    })
    @IsPhoneNumber()
    @IsOptional()
    phone_number?: string;

    @ApiProperty({
        example: "Qaipchoq ko'chasi 34-2",
        description: "Client manzili",
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ example: "link", description: "Client lokatsiyasi linki" })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ example: "salim@gmail.com", description: "Client emaili" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: "password", description: "Client paroli" })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({ example: "confirm_password", description: "Admin paroli" })
    @IsString()
    @IsOptional()
    confirm_password?: string;

    
}
