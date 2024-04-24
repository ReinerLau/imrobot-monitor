import { bigint, int, json, mysqlTable } from 'drizzle-orm/mysql-core';

export const screen = mysqlTable('screen', {
  id: int('id').autoincrement().primaryKey(),
  time: bigint('time', { mode: 'number' }).notNull(),
  data: json('data').notNull(),
});
