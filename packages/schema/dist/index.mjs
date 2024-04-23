// src/schema/app.ts
import { bigint, int, mysqlTable } from "drizzle-orm/mysql-core";
var app = mysqlTable("app", {
  id: int("id").autoincrement().primaryKey(),
  time: bigint("time", { mode: "number" }).notNull()
  // hasError: boolean("has_error"),
  // behaviorId: int("behavior_id"),
  // screenId: int("screen_id"),
});

// src/schema/behavior.ts
import { int as int2, json, mysqlTable as mysqlTable2 } from "drizzle-orm/mysql-core";
var behavior = mysqlTable2("behavior", {
  id: int2("id").autoincrement().primaryKey(),
  data: json("data").notNull()
});

// src/schema/errors.ts
import { bigint as bigint2, int as int3, mysqlTable as mysqlTable3, text } from "drizzle-orm/mysql-core";
var code = mysqlTable3("code", {
  id: int3("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int3("columnNumber").notNull(),
  lineNumber: int3("lineNumber").notNull(),
  time: text("time").notNull(),
  behaviorId: int3("behavior_id"),
  screenId: int3("screen_id")
});
var resource = mysqlTable3("resource", {
  id: int3("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull(),
  behaviorId: int3("behavior_id"),
  screenId: int3("screen_id")
});
var request = mysqlTable3("request", {
  id: int3("id").autoincrement().primaryKey(),
  status: int3("status").notNull(),
  response: text("response"),
  elapsedTime: bigint2("elapsedTime", { mode: "number" }).notNull(),
  url: text("url").notNull(),
  requestURL: text("requestURL").notNull(),
  time: text("time").notNull(),
  method: text("method").notNull(),
  requestData: text("requestData").notNull(),
  behaviorId: int3("behavior_id"),
  screenId: int3("screen_id")
});

// src/schema/screen.ts
import { bigint as bigint3, int as int4, json as json2, mysqlTable as mysqlTable4 } from "drizzle-orm/mysql-core";
var screen = mysqlTable4("screen", {
  id: int4("id").autoincrement().primaryKey(),
  time: bigint3("time", { mode: "number" }).notNull(),
  data: json2("data").notNull()
});
export {
  app,
  behavior,
  code,
  request,
  resource,
  screen
};
