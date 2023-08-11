import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: "Worker id" })
  @IsNumber()
  client_id: number;

  @ApiProperty({ example: 1, description: "Part id" })
  @IsNumber()
  part_id: number;

  @ApiProperty({
    example: "2023-08-06",
    description: "Service boshlanish vaqti",
  })
  @IsDateString()
  start_time: Date;

  @ApiProperty({ example: "2023-08-07", description: "Service tugash vaqti" })
  @IsDateString()
  end_time: Date;

  @ApiProperty({ example: 1, description: "nechtaligi" })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 200000, description: "narxi" })
  @IsNumber()
  total_cost: number;
}
