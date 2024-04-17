import { int, json, mysqlTable } from "drizzle-orm/mysql-core";

export const screen = mysqlTable("screen", {
  id: int("id").autoincrement().primaryKey(),
  data: json("data").notNull(),
});
