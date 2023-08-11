import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Part } from './model/part.model';
import { Manufacturer } from '../manufacturer/model/manufacturer.model';

@Module({
  imports:[SequelizeModule.forFeature([Part,Manufacturer])],
  controllers: [PartsController],
  providers: [PartsService],
  exports:[PartsService]
})
export class PartsModule {}
