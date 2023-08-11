import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateManufacturerDto {
  @ApiProperty({ example: "Sobir", description: "Foydalanuvchi ismi" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "toshkent", description: "Foydalanuchi manzili" })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: "+998991234567", description: "Foydalanuvchi phone" })
  @IsPhoneNumber()
  number: string;
}
