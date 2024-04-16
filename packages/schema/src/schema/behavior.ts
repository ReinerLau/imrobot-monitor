import { int, json, mysqlTable } from "drizzle-orm/mysql-core";

export const behavior = mysqlTable("behavior", {
  id: int("id").autoincrement().primaryKey(),
  data: json("data").notNull(),
});
