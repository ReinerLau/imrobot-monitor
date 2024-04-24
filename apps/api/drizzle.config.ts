import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'path';

config({ path: path.resolve(__dirname, './.env') });

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL || '',
  },
});
