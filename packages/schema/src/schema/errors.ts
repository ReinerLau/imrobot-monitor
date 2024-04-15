import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const errors = mysqlTable("errors", {
  id: int("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  url: text("url").notNull(),
  columnNumber: int("columnNumber"),
  lineNumber: int("lineNumber"),
});
