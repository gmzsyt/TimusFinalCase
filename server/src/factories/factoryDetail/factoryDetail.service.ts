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
        console.log(`Sütun '${columnName}' zaten '${tableName}' tablosunda mevcut`);
      }
      const addQuery = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;
      await this.pool.query(addQuery);

      console.log(`Sütun '${columnName}' başarıyla '${tableName}' tablosuna eklendi`);
    } catch (error) {
      console.error('Sütun eklenirken bir hata oluştu:', error);
      throw new Error('Sütun eklenirken bir hata oluştu.');
    }
  }

//   async removeColumn(columnName: string): Promise<void> {
//     const tableName = 'factory_detail';
//     try {
//         const checkQuery = `
//             SELECT EXISTS (
//                 SELECT 1
//                 FROM information_schema.columns
//                 WHERE table_name = '${tableName}' AND column_name = '${columnName}'
//             ) as column_exists;
//         `;
//         const checkResult = await this.pool.query(checkQuery);

//         if (!checkResult.rows[0].column_exists) {
//             console.log(`Sütun '${columnName}' '${tableName}' tablosunda mevcut değil`);
//             throw new NotFoundException(`Sütun '${columnName}' bulunamadı.`);
//         }

//         // Sütunu kaldır
//         const removeQuery = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;
//         await this.pool.query(removeQuery);

//         console.log(`Sütun '${columnName}' başarıyla '${tableName}' tablosundan kaldırıldı`);
//     } catch (error) {
//         console.error('Sütun kaldırma sırasında bir hata oluştu:', error);
//         throw new Error('Sütun kaldırma sırasında bir hata oluştu.');
//     }
// }
    }
