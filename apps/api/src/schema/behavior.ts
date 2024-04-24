import { bigint, int, json, mysqlTable } from 'drizzle-orm/mysql-core';

export const behavior = mysqlTable('behavior', {
  id: int('id').autoincrement().primaryKey(),
  time: bigint('time', { mode: 'number' }).notNull(),
  data: json('data').notNull(),
});
