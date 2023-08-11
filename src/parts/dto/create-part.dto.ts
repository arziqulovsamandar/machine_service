import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePartDto {
  @ApiProperty({ example: "Sobir", description: "Foydalanuvchi ismi" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Sobir", description: "Foydalanuvchi ismi" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "1", description: "order_id" })
  manafucturer_id: number;

  @ApiProperty({ example: "20000", description: "price" })
  @IsNotEmpty()
  price: number;
}
