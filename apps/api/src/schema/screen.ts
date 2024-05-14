import { bigint, int, json, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const screen = mysqlTable('screen', {
  id: int('id').autoincrement().primaryKey(),
  type: int('type').notNull(),
  data: text('data').notNull(),
  timestamp: bigint('timestamp', { mode: 'number' }).notNull(),
});

export const fullSnapshot = mysqlTable('fullSnapshot', {
  id: int('id').autoincrement().primaryKey(),
  data: json('data').notNull(),
  timestamp: bigint('timestamp', { mode: 'number' }).notNull(),
  hash: text('hash').notNull(),
});
