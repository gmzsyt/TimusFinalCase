import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../../constants'
import { Pool, PoolClient } from 'pg';
import { FactoryListCreateDTO } from './dtos/factoryListCreate.dto';
import { FactoryListUpdateDTO } from './dtos/factoryListUpdate.dto';
<<<<<<< Updated upstream
=======
import { DeleteDTO } from './dtos/factoryListDelete.dto';
>>>>>>> Stashed changes

@Injectable()
export class FactoryListService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async findAll(): Promise<any[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM factory_list');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM factory_list WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async create(factoryListCreateDTO: FactoryListCreateDTO): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(
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
    } finally {
      client.release();
    }
  }

  async update(id: number, factoryListUpdateDTO: FactoryListUpdateDTO): Promise<any> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(
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
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      await client.query('DELETE FROM factory_list WHERE id = $1', [id]);
    } finally {
      client.release();
    }
  }
}
