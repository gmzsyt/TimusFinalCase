import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FactoryDetailService } from './factoryDetail.service';
import { FactoryDetailCreateDTO } from './dtos/factoryDetailCreate.dto';
import { FactoryDetailUpdateDTO } from './dtos/factoryDetailUpdate.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwtAuthGuard';

@Controller('factoryDetail')
@UseGuards(JwtAuthGuard)
export class FactoryDetailController {
  constructor(private readonly factoryDetailService: FactoryDetailService) {}

  @Get(':factoryId')
  findAll(@Param('factoryId') factoryId: number) {
    return this.factoryDetailService.findAll(factoryId);
  }

  @Get('findById/:id')
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

  /*@Delete('removeColumnFactoryDetailTable/:columnName')
  async removeColumn(@Param('columnName') columnName: string): Promise<any> {
    try {
      await this.factoryDetailService.removeColumn(columnName);
      return { message: `Column '${columnName}' removed successfully.` };
    } catch (error) {
      console.error('An error occurred while removing the column:', error);
      throw new Error('An error occurred while removing the column.');
    }
  } */
}

