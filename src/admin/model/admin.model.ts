import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    is_active: boolean;
    is_creator: boolean;
}

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, AdminAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: "Salim", description: "Admin ismi" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @ApiProperty({ example: "Salimov", description: "Admin familiyasi" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Admin telefon raqami",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    phone_number: string;

    @ApiProperty({ example: "salim@gmail.com", description: "Admin emaili" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @ApiProperty({ example: "password", description: "Admin paroli" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({ type: DataType.STRING })
    activation_link: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_creator: boolean;

    @Column({ type: DataType.STRING })
    refresh_token: string;
}
