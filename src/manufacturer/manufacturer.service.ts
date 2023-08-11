import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Manufacturer } from './model/manufacturer.model';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer)
    private readonly manufacturerModel: typeof Manufacturer
  ) {}

  async findAll(): Promise<Manufacturer[]> {
    return this.manufacturerModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Manufacturer> {
    return this.manufacturerModel.findByPk(id);
  }

  async create(
    createManufacturerDto: CreateManufacturerDto
  ): Promise<Manufacturer> {
    return this.manufacturerModel.create(createManufacturerDto);
  }

  async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto
  ): Promise<Manufacturer> {
    const builder = await this.manufacturerModel.update(updateManufacturerDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }

  async delete(id: number): Promise<void> {
    const numRowsDeleted = await this.manufacturerModel.destroy({
      where: { id },
    });

    if (numRowsDeleted === 0) {
      throw new Error(`Could not delete venue type with id ${id}`);
    }
  }
}
