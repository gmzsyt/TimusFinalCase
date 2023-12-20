import { Pool } from 'pg';
import { PG_CONNECTION } from '../../constants';

export const dbProvider = {
  provide: PG_CONNECTION,
  useFactory: async () => {
    const pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT, 10)
    });

    const client = await pool.connect();

    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS factory_list (
          id SERIAL PRIMARY KEY,
          company_name TEXT,
          membership_start_date DATE,
          membership_end_date DATE,
          employee_count INTEGER,
          free_member BOOLEAN
        );
      `);
      console.log("tablo oluşturuldu 1")

      await client.query(`
      CREATE TABLE IF NOT EXISTS factory_detail (
        id SERIAL PRIMARY KEY,
        factory_id INTEGER REFERENCES factory_list(id),
        using_unit TEXT,
        date_range DATERANGE,
        usage_kw INTEGER,
        usage_fee INTEGER,
        discounted_price BOOLEANY
      );
      `);
      console.log("tablo oluşturuldu 2")


      return client;
    } catch (error) {
      throw error;
    }
  },
};
