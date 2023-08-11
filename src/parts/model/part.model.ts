import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Manufacturer } from "../../manufacturer/model/manufacturer.model";

import { Order } from "../../order/model/order.model";

interface PartAtr{
    name:string;
    description:string;
    price:number;
    manafucturer_id:number
}
@Table({tableName:'part'})
export class Part extends Model<Part, PartAtr> {
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

  @ApiProperty({ example: "12000", description: "price" })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({ example: "txt", description: "description" })
  @Column({
    type: DataType.STRING,
  })
  description: string;


  @ForeignKey(() => Manufacturer)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  manafucturer_id: number;

  @BelongsTo(() => Manufacturer)
  manafacturer: Manufacturer;

  @HasMany(() => Order)
  order: Order[];
}

