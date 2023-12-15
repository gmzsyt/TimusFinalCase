import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FactoryDetailService } from './factoryDetail.service';
import { FactoryDetailCreateDTO } from './dtos/factoryDetailCreate.dto';
import { FactoryDetailUpdateDTO } from './dtos/factoryDetailUpdate.dto';

@Controller('factoryDetail')
export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  @Get(':factoryId')
  findAll(@Param('factoryId') factoryId: number) {
    return this.factoryDetailService.findAll(factoryId);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.factoryDetailService.findById(id);
  }

  @Post(':factoryId')
  create(@Param('factoryId') factoryId: number, @Body() createDTO: FactoryDetailCreateDTO) {
    return this.factoryDetailService.create(factoryId, createDTO);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDTO: FactoryDetailUpdateDTO) {
    return this.factoryDetailService.update(id, updateDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.factoryDetailService.delete(id);
  }
}
