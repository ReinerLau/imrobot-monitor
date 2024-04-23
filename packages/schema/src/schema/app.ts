import { bigint, boolean, int, mysqlTable } from "drizzle-orm/mysql-core";

export const app = mysqlTable("app", {
  id: int("id").autoincrement().primaryKey(),
  startTime: bigint("startTime", { mode: "number" }).notNull(),
  endTime: bigint("endTime", { mode: "number" }).notNull(),
  hasError: boolean("has_error"),
  behaviorId: int("behavior_id"),
  screenId: int("screen_id"),
});
