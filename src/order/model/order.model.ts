import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from "sequelize-typescript";
import { Client } from "../../client/model/client.model";
import { Part } from "../../parts/model/part.model";

interface OrderAttr {
    client_id: number;
    part_id: number;
    start_time:Date;
    end_time:Date;
    quantity: number;
    total_cost:number
}

@Table({ tableName: "order" })
export class Order extends Model<Order, OrderAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: "Client id" })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;

  @BelongsTo(() => Client)
  client: Client;

  @ApiProperty({
    example: "2023-08-06",
    description: "Service boshlanish vaqti",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time: Date;

  @ApiProperty({
    example: "2023-08-06",
    description: "Service tugash vaqti",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_time: Date;

  @ApiProperty({ example: "2", description: "mahsulot soni" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: "2", description: "narxi" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_cost: number;

  @ApiProperty({ example: 1, description: "part id" })
  @ForeignKey(() => Part)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part_id: number;

  @BelongsTo(() => Part)
  part: Part;
}
