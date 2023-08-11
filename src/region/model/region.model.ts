import { ApiProperty } from "@nestjs/swagger";

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { Client } from "../../client/model/client.model";

interface RegionAttr {
  viloyat: string;
  tuman: string;
  mahala: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, RegionAttr> {
  @ApiProperty({ example: 1, description: "UNIQUE ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "toshkent", description: "Foydalanuvchi viloyati" })
  @Column({
    type: DataType.STRING,
  })
  viloyat: string;

  @ApiProperty({ example: "Olmazor", description: "Foydalanuvchi tumani" })
  @Column({
    type: DataType.STRING,
  })
  tuman: string;

  @ApiProperty({
    example: "Mirzo Golib",
    description: "Foydalanuvchi mahalasi",
  })
  @Column({
    type: DataType.STRING,
  })
  mahala: string;

  @HasMany(() => Client)
  client: Client[];
}
