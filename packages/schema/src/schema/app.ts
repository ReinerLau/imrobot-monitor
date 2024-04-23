import { bigint, int, mysqlTable } from "drizzle-orm/mysql-core";

export const app = mysqlTable("app", {
  id: int("id").autoincrement().primaryKey(),
  time: bigint("time", { mode: "number" }).notNull(),
  // hasError: boolean("has_error"),
  // behaviorId: int("behavior_id"),
  // screenId: int("screen_id"),
});
