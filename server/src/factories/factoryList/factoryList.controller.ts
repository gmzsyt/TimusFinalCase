import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FactoryListCreateDTO } from './dtos/factoryListCreate.dto';
import { FactoryListUpdateDTO } from './dtos/factoryListUpdate.dto';
import { FactoryListService } from './factoryList.service';

export class FactoryListController {
  constructor(private readonly factoryListService: FactoryListService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.factoryListService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    return this.factoryListService.findById(+id);
  }

  @Post()
  async create(@Body() factoryListCreateDTO: FactoryListCreateDTO): Promise<any> {
    return this.factoryListService.create(factoryListCreateDTO);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() factoryListUpdateDTO: FactoryListUpdateDTO): Promise<any> {
    return this.factoryListService.update(+id, factoryListUpdateDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.factoryListService.delete(+id);
  }
}
