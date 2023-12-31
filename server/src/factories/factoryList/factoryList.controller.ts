import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FactoryListCreateDTO } from './dtos/factoryListCreate.dto';
import { FactoryListUpdateDTO } from './dtos/factoryListUpdate.dto';
import { FactoryListService } from './factoryList.service';
import { DeleteDTO } from './dtos/factoryListDelete.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwtAuthGuard';

@Controller('factoryList')
@UseGuards(JwtAuthGuard)
export class FactoryListController {
  constructor(private readonly factoryListService: FactoryListService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.factoryListService.findAll();
  }

  @Get('findById/:id')
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

  @Delete('removeColumnFactoryListTable/:columnName')
  async removeColumn(@Param('columnName') columnName: string): Promise<any> {
    try {
      await this.factoryListService.removeColumn(columnName);
      return { message: `Column '${columnName}' removed successfully.` };
    } catch (error) {
      console.error('An error occurred while removing the column:', error);
      throw new Error('An error occurred while removing the column.');
    }
  }
  
  @Post('addColumnFactoryListTable')
  async addColumn(
    @Body() columnInfo: { columnName: string, columnType: string },
  ): Promise<any> {
    try {
      const { columnName, columnType } = columnInfo;
      await this.factoryListService.addColumn(columnName, columnType);
      return { message: `Column '${columnName}' added successfully.` };
    } catch (error) {
      console.error('An error occurred while adding the column:', error.message);
      if (error.detail) {
        console.error('PostgreSQL Error Detail:', error.detail);
      }
      throw new Error('An error occurred while adding the column.');
    }
  }
  
  @Get('getColumnNames') 
async getColumnNames(): Promise<string[]> {
  try {
    const columnNames = await this.factoryListService.getColumnNames();
    return columnNames;
  } catch (error) {
    console.error('An error occurred while fetching column names:', error);
    throw new Error('An error occurred while fetching column names.');
  }
}
}
