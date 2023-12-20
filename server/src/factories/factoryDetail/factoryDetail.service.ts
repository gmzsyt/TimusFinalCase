import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../../../constants';
import { Pool, PoolClient } from 'pg';
import { FactoryDetailCreateDTO } from './dtos/factoryDetailCreate.dto';
import { FactoryDetailUpdateDTO } from './dtos/factoryDetailUpdate.dto';
import { error } from 'console';

@Injectable()
export class FactoryDetailService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async findAll(factoryId: number): Promise<any[]> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM factory_detail WHERE factory_id = $1', [factoryId]);
      return result.rows;
    } catch{error}
  }

  async findById(id: number): Promise<any> {
    const existingRecord = await this.pool.query('SELECT * FROM factory_detail WHERE id = $1', [id]);
  
    if (!existingRecord.rows[0]) {
      throw new NotFoundException(`FactoryDetail with ID ${id} not found`);
    }
    return existingRecord.rows[0];
  }
  

async create(factoryId: number, factoryDetailCreateDTO: FactoryDetailCreateDTO): Promise<any> {
  try {
    const startDate = new Date(factoryDetailCreateDTO.start_date).toISOString(); 
    const endDate = new Date(factoryDetailCreateDTO.end_date).toISOString();     

    const result = await this.pool.query(
      'INSERT INTO factory_detail (factory_id, using_unit, date_range, usage_kw, usage_fee, discounted_price) VALUES ($1, $2, daterange($3, $4), $5, $6, $7) RETURNING *',
      [
        factoryId,
        factoryDetailCreateDTO.using_unit,
        startDate,
        endDate,
        factoryDetailCreateDTO.usage_kw,
        factoryDetailCreateDTO.usage_fee,
        factoryDetailCreateDTO.discounted_price,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error('An error occurred while creating the factory:', error);
    throw new Error('An error occurred while creating the factory.');
  }
}

async update(id: number, factoryDetailUpdateDTO: FactoryDetailUpdateDTO): Promise<any> {
  const existingRecord = await this.findById(id);

  if (!existingRecord) {
    throw new NotFoundException(`Factory with ID ${id} not found`);
  }

  try {
    const startDate = new Date(factoryDetailUpdateDTO.start_date).toISOString();
    const endDate = new Date(factoryDetailUpdateDTO.end_date).toISOString();

    const result = await this.pool.query(
      'UPDATE factory_detail SET using_unit = $1, date_range = daterange($2, $3), usage_kw = $4, usage_fee = $5, discounted_price = $6 WHERE id = $7 RETURNING *',
      [
        factoryDetailUpdateDTO.using_unit,
        startDate,
        endDate,
        factoryDetailUpdateDTO.usage_kw,
        factoryDetailUpdateDTO.usage_fee,
        factoryDetailUpdateDTO.discounted_price,
        id,
      ],
    );
    

    return result.rows[0];
  }  catch (error) {
    console.error('An error occurred while updating the factory:', error);
    throw new Error(`An error occurred while updating the factory. Details: ${error.message}`);
  }
}

  async delete(id: number): Promise<void> {

    const existingRecord = await this.findById(id);

    if (!existingRecord) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }

    try {
      await this.pool.query('DELETE FROM factory_detail WHERE id = $1', [id]);
    } catch (error) {
      throw new Error('An error occurred while deleting the factory.');
    }
  }

  async addColumn(columnName: string, columnType: string): Promise<void> {
    const tableName = 'factory_detail';
    try {
      const checkQuery = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = '${tableName}' AND column_name = '${columnName}'
        ) as column_exists;
      `;
      const checkResult = await this.pool.query(checkQuery);
  
      if (checkResult.rows[0].column_exists) {
        console.log(`Column '${columnName}' already exists in table '${tableName}'`);
      }
  
      const addQuery = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
      await this.pool.query(addQuery);
  
      console.log(`Column '${columnName}' added successfully to table '${tableName}'`);
    } catch (error) {
      console.error('An error occurred while adding the column:', error);
      throw new Error('An error occurred while adding the column.');
    }
  }
  

  async removeColumn(columnName: string): Promise<void> {
    const tableName = 'factory_detail';
    try {
      const checkQuery = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = '${tableName}' AND column_name = '${columnName}'
        ) as column_exists;
      `;
      const checkResult = await this.pool.query(checkQuery);

      if (!checkResult.rows[0].column_exists) {
        console.log(`Column '${columnName}' does not exist in table '${tableName}'`);
        throw new NotFoundException(`Column '${columnName}' not found.`);
      }

      const removeQuery = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;
      await this.pool.query(removeQuery);

      console.log(`Column '${columnName}' removed successfully from table '${tableName}'`);
    } catch (error) {
      console.error('An error occurred while removing the column:', error);
      throw new Error('An error occurred while removing the column.');
    }
  }

  async getColumnNames(): Promise<string[]> {
    const queryResult = await this.pool.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', ['factory_detail']);
    const columnNames = queryResult.rows.map((row: any) => row.column_name);
    console.log('Query Result:', queryResult);

    return columnNames;
  }

 
    }
