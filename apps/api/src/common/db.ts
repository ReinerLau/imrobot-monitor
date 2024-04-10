import * as mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from '@imrobot/schema';

let connection: mysql.Connection;

async function createConnection() {
  return await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });
}

export async function setupDB() {
  if (connection) return;

  connection = await createConnection();

  return drizzle(connection, {
    schema,
    mode: 'planetscale',
  });
}
