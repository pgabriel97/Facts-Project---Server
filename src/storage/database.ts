import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = process.env.PG_HOST || 'localhost';
const PORT = process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432;
const USERNAME = process.env.PG_USER || 'postgres';
const PASSWORD = process.env.PG_PASS || 'default';
const DATABASE = process.env.PG_DB;

export const pool = new Pool({
  user: USERNAME,
  host: HOSTNAME,
  password: PASSWORD,
  database: DATABASE,
  port: PORT
});