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

import { Order } from "../../order/model/order.model";
import { Region } from "../../region/model/region.model";

interface ClientAttr {
  first_name: string;
  last_name: string;
  phone_number: string;
  region_id: number;
  location: string;
  email: string;
  password: string;
}

@Table({ tableName: "client" })
export class Client extends Model<Client, ClientAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Salim", description: "Client ismi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: "Salimov", description: "Client familiyasi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Client telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: "Qaipchoq ko'chasi 34-2",
    description: "Client manzili",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  region_id: number;

  @BelongsTo(() => Region)
 regions:Region;

  @ApiProperty({ example: "link", description: "Client lokatsiyasi linki" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @ApiProperty({ example: "salim@gmail.com", description: "Client emaili" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "password", description: "Client paroli" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({ type: DataType.STRING })
  activation_link: string;

  @Column({ type: DataType.STRING })
  refresh_token: string;

  @HasMany(() => Order)
  orders: Order[];
}
