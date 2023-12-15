import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FactoryListCreateDTO } from './dtos/factoryListCreate.dto';
import { FactoryListUpdateDTO } from './dtos/factoryListUpdate.dto';
import { FactoryListService } from './factoryList.service';
import { DeleteDTO } from './dtos/factoryListDelete.dto';

@Controller('factoryList')
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
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleteDTO: DeleteDTO = { id }; 
    await this.factoryListService.delete(deleteDTO);
  }
}
