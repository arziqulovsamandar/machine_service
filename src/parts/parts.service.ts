import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Part } from './model/part.model';

@Injectable()
export class PartsService {
  constructor(
    @InjectModel(Part)
    private readonly regionModel: typeof Part
  ) {}

  async findAll(): Promise<Part[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Part> {
    return this.regionModel.findByPk(id);
  }

  async create(createPartDto: CreatePartDto): Promise<Part> {
    return this.regionModel.create(createPartDto);
  }

  async update(
    id: number,
    updatePartDto: UpdatePartDto
  ): Promise<Part> {
    const builder = await this.regionModel.update(updatePartDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }

  async delete(id: number): Promise<void> {
    const numRowsDeleted = await this.regionModel.destroy({
      where: { id },
    });

    if (numRowsDeleted === 0) {
      throw new Error(`Could not delete venue type with id ${id}`);
    }
  }
}
