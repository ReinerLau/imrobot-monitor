import { bigint, int, json, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const screen = mysqlTable('screen', {
  id: int('id').autoincrement().primaryKey(),
  time: bigint('time', { mode: 'number' }).notNull(),
  data: json('data').notNull(),
  hash: text('hash').notNull(),
});

export const fullSnapshot = mysqlTable('fullSnapshot', {
  id: int('id').autoincrement().primaryKey(),
  data: json('data').notNull(),
  hash: text('hash').notNull(),
});
