import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Part } from './model/part.model';

@Controller("parts")
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @ApiOperation({ summary: "All Part" })
  @Get()
  async findAll(): Promise<Part[]> {
    return this.partsService.findAll();
  }

  @ApiOperation({ summary: "Id Serach Part" })
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Part> {
    return this.partsService.findOne(id);
  }

  @ApiOperation({ summary: "Create Part" })
  @Post()
  async create(@Body() createServiceDto: CreatePartDto): Promise<Part> {
    return this.partsService.create(createServiceDto);
  }

  @ApiOperation({ summary: "Update Part" })
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateTypeDto: UpdatePartDto
  ): Promise<Part> {
    return this.partsService.update(id, updateTypeDto);
  }

  @ApiOperation({ summary: "Delete Part" })
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.partsService.delete(id);
  }
}
