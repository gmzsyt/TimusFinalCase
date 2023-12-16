import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../../../constants'
import { Pool, PoolClient } from 'pg';
import { FactoryListCreateDTO } from './dtos/factoryListCreate.dto';
import { FactoryListUpdateDTO } from './dtos/factoryListUpdate.dto';
import { DeleteDTO } from './dtos/factoryListDelete.dto';

@Injectable()
export class FactoryListService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async findAll(): Promise<any[]> {
    try {
      const result = await this.pool.query('SELECT * FROM factory_list');
      return result.rows;
    } catch (error) {
      console.error('An error occurred while fetching the id:', error);
        throw new Error('An error occurred while creating the factory.');
    }
  }

  async findById(id: number): Promise<any> {
    const existingRecord = await this.pool.query('SELECT * FROM factory_list WHERE id = $1', [id]);
    if (!existingRecord.rows[0]) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }
    return existingRecord.rows[0];
}

  async create(factoryListCreateDTO: FactoryListCreateDTO): Promise<any> {
    try {
      const result = await this.pool.query(
        'INSERT INTO factory_list (company_name, membership_start_date, membership_end_date, employee_count, free_member) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          factoryListCreateDTO.company_name,
          factoryListCreateDTO.membership_start_date,
          factoryListCreateDTO.membership_end_date,
          factoryListCreateDTO.employee_count,
          factoryListCreateDTO.free_member,
        ],
      );
      return result.rows[0];
    } 
    catch (error) {
      console.error('An error occurred while creating the factory:', error);
        throw new Error('An error occurred while creating the factory.');
    }
  }

  async update(id: number, factoryListUpdateDTO: FactoryListUpdateDTO): Promise<any> {
    const existingRecord = await this.findById(id);
  
    if (!existingRecord) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }
  
    try {
      const result = await this.pool.query(
        'UPDATE factory_list SET company_name = $1, membership_start_date = $2, membership_end_date = $3, employee_count = $4, free_member = $5 WHERE id = $6 RETURNING *',
        [
          factoryListUpdateDTO.company_name,
          factoryListUpdateDTO.membership_start_date,
          factoryListUpdateDTO.membership_end_date,
          factoryListUpdateDTO.employee_count,
          factoryListUpdateDTO.free_member,
          id,
        ],
      );
  
      return result.rows[0];
    } catch (error) {
      throw new Error('An error occurred while updating the factory.');
    }
  }

  async delete(deleteDTO: DeleteDTO): Promise<void> {
    const { id } = deleteDTO;

    const existingRecord = await this.findById(id);

    if (!existingRecord) {
      throw new NotFoundException(`Factory with ID ${id} not found`);
    }

    try {
      await this.pool.query('DELETE FROM factory_list WHERE id = $1', [id]);
    } catch (error) {
      throw new Error('An error occurred while deleting the factory.');
    }
  }

  async addColumn(columnName: string, columnType: string): Promise<void> {
    const tableName = 'factory_list';
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
    const tableName = 'factory_list';
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


}
  