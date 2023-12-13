import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../../constants';
import { Pool, PoolClient } from 'pg';
import { FactoryDetailCreateDTO } from './dtos/factoryDetailCreate.dto';
import { FactoryDetailUpdateDTO } from './dtos/factoryDetailUpdate.dto';

@Injectable()
export class FactoryDetailService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async findAll(factoryId: number): Promise<any[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM factory_detail WHERE factory_id = $1', [factoryId]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM factory_detail WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async create(factoryId: number, factoryDetailCreateDTO: FactoryDetailCreateDTO): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO factory_detail (factory_id, using_unit, date_range, usage_kw, usage_fee, discounted_price) VALUES ($1, $2, tstzrange($3, $4), $5, $6, $7) RETURNING *',
        [
          factoryId,
          factoryDetailCreateDTO.using_unit,
          factoryDetailCreateDTO.start_date,
          factoryDetailCreateDTO.end_date,
          factoryDetailCreateDTO.usage_kw,
          factoryDetailCreateDTO.usage_fee,
          factoryDetailCreateDTO.discounted_price,
        ],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: number, factoryDetailUpdateDTO: FactoryDetailUpdateDTO): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(
        'UPDATE factory_detail SET using_unit = $1, date_range = tstzrange($2, $3), usage_kw = $4, usage_fee = $5, discounted_price = $6 WHERE id = $7 RETURNING *',
        [
          factoryDetailUpdateDTO.using_unit,
          factoryDetailUpdateDTO.start_date,
          factoryDetailUpdateDTO.end_date,
          factoryDetailUpdateDTO.usage_kw,
          factoryDetailUpdateDTO.usage_fee,
          factoryDetailUpdateDTO.discounted_price,
          id,
        ],
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query('DELETE FROM factory_detail WHERE id = $1', [id]);
    } finally {
      client.release();
    }
  }
}
