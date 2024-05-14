import { bigint, int, mysqlTable } from 'drizzle-orm/mysql-core';

export const app = mysqlTable('app', {
  id: int('id').autoincrement().primaryKey(),
  endTime: bigint('endTime', { mode: 'number' }).notNull(),
  startTime: bigint('startTime', { mode: 'number' }).notNull(),
});
