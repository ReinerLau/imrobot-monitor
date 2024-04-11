// src/schema/errors.ts
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
var errors = mysqlTable("errors", {
  id: int("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  columnNumber: int("columnNumber").notNull(),
  lineNumber: int("lineNumber").notNull()
});
export {
  errors
};
