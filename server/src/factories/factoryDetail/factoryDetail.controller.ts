import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FactoryDetailService } from './factoryDetail.service';
import { FactoryDetailCreateDTO } from './dtos/factoryDetailCreate.dto';
import { FactoryDetailUpdateDTO } from './dtos/factoryDetailUpdate.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwtAuthGuard';

@Controller('factoryDetail')
@UseGuards(JwtAuthGuard)

export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  @Get('factory/:factoryId')
  findAll(@Param('factoryId') factoryId: number) {
    return this.factoryDetailService.findAll(factoryId);
  }


  @Post('createFactory/:factoryId')
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

  @Delete('removeColumnFactoryDetailTable/:columnName')
  async removeColumn(@Param('columnName') columnName: string): Promise<any> {
    try {
      await this.factoryDetailService.removeColumn(columnName);
      return { message: `Column '${columnName}' removed successfully.` };
    } catch (error) {
      console.error('An error occurred while removing the column:', error);
      throw new Error('An error occurred while removing the column.');
    }
  }

  @Post('addColumnFactoryDetailTable')
  async addColumn(
    @Body() columnInfo: { columnName: string, columnType: string },
  ): Promise<any> {
    try {
      const { columnName, columnType } = columnInfo;
      await this.factoryDetailService.addColumn(columnName, columnType);
      return { message: `Column '${columnName}' added successfully.` };
    } catch (error) {
      console.error('An error occurred while adding the column:', error.message);
      if (error.detail) {
        console.error('PostgreSQL Error Detail:', error.detail);
      }
      throw new Error('An error occurred while adding the column.');
    }
  }

  @Get('getColumnNamesFactoryDetailTable')
  async getColumnNames(): Promise<string[]> {
    try {
      const columnNames = await this.factoryDetailService.getColumnNames();
      return columnNames;
    } catch (error) {
      console.error('An error occurred while getting column names:', error);
      throw new Error('An error occurred while getting column names.');
    }
  }
  @Get('type/check/getColumnMetadataD')
async getColumnMetadata(): Promise<{ columnName: string; dataType: string }[]> {
  try {
    const columnMetadata = await this.factoryDetailService.getColumnMetadata();
    return columnMetadata;
  } catch (error) {
    console.error('An error occurred while fetching column metadata:', error);
    throw new Error('An error occurred while fetching column metadata.');
  }
}
}


