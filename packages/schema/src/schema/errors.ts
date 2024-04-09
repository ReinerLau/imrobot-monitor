import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const errors = mysqlTable("errors", {
  id: int("id").primaryKey(),
  message: text("message").notNull(),
});
