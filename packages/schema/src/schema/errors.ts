import { bigint, int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { behavior } from "./behavior";
import { screen } from "./screen";

export const code = mysqlTable("code", {
  id: int("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int("columnNumber").notNull(),
  lineNumber: int("lineNumber").notNull(),
  time: text("time").notNull(),
  behaviorId: int("behavior_id").references(() => behavior.id),
  screenId: int("screen_id").references(() => screen.id),
});

export const resource = mysqlTable("resource", {
  id: int("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull(),
  behaviorId: int("behavior_id").references(() => behavior.id),
  screenId: int("screen_id").references(() => screen.id),
});

export const request = mysqlTable("request", {
  id: int("id").autoincrement().primaryKey(),
  status: int("status").notNull(),
  response: text("response"),
  elapsedTime: bigint("elapsedTime", { mode: "number" }).notNull(),
  url: text("url").notNull(),
  requestURL: text("requestURL").notNull(),
  time: text("time").notNull(),
  method: text("method").notNull(),
  requestData: text("requestData").notNull(),
  behaviorId: int("behavior_id").references(() => behavior.id),
  screenId: int("screen_id").references(() => screen.id),
});
