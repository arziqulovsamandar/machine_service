
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Part } from "../../parts/model/part.model";

interface ManufacturerAtr{
    name:string;
    address:string;
    number:string
}
@Table({ tableName: "manufacturer" })
export class Manufacturer extends Model<Manufacturer, ManufacturerAtr> {
  @ApiProperty({ example: 1, description: "UNIQUE ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Sobir", description: "Foydalanuvchi ismi" })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: "Toshkent", description: "Foydalanuvchi manzili" })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: "+9981234567",
    description: "Foydalanuvchi numberi",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  number: string;

  @HasMany(() => Part)
  part: Part[];
}
