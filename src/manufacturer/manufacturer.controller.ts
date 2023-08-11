import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Manufacturer } from './model/manufacturer.model';

@Controller("manufacturer")
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @ApiOperation({ summary: "All Region" })
  @Get()
  async findAll(): Promise<Manufacturer[]> {
    return this.manufacturerService.findAll();
  }

  @ApiOperation({ summary: "Id Serach Region" })
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Manufacturer> {
    return this.manufacturerService.findOne(id);
  }

  @ApiOperation({ summary: "Create Region" })
  @Post()
  async create(
    @Body() createManufacturerDto: CreateManufacturerDto
  ): Promise<Manufacturer> {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @ApiOperation({ summary: "Update Region" })
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateManufacturerDto: UpdateManufacturerDto
  ): Promise<Manufacturer> {
    return this.manufacturerService.update(id, updateManufacturerDto);
  }

  @ApiOperation({ summary: "Delete Region" })
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.manufacturerService.delete(id);
  }
}
