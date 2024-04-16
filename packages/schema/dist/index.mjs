// src/schema/behavior.ts
import { int, json, mysqlTable } from "drizzle-orm/mysql-core";
var behavior = mysqlTable("behavior", {
  id: int("id").autoincrement().primaryKey(),
  data: json("data").notNull()
});

// src/schema/errors.ts
import { bigint, int as int2, mysqlTable as mysqlTable2, text } from "drizzle-orm/mysql-core";
var code = mysqlTable2("code", {
  id: int2("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int2("columnNumber").notNull(),
  lineNumber: int2("lineNumber").notNull(),
  time: text("time").notNull(),
  behaviorId: int2("behavior_id").references(() => behavior.id)
});
var resource = mysqlTable2("resource", {
  id: int2("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull(),
  behaviorId: int2("behavior_id").references(() => behavior.id)
});
var request = mysqlTable2("request", {
  id: int2("id").autoincrement().primaryKey(),
  status: int2("status").notNull(),
  response: text("response"),
  elapsedTime: bigint("elapsedTime", { mode: "number" }).notNull(),
  url: text("url").notNull(),
  requestURL: text("requestURL").notNull(),
  time: text("time").notNull(),
  method: text("method").notNull(),
  requestData: text("requestData").notNull(),
  behaviorId: int2("behavior_id").references(() => behavior.id)
});
export {
  behavior,
  code,
  request,
  resource
};
