import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password:'postgres',
  database: 'ticsproyect',
  port: 5432,
});

module.exports = pool;