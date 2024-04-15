// src/schema/errors.ts
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
var code = mysqlTable("code", {
  id: int("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int("columnNumber").notNull(),
  lineNumber: int("lineNumber").notNull(),
  time: text("time").notNull()
});
var resource = mysqlTable("resource", {
  id: int("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull()
});
export {
  code,
  resource
};
