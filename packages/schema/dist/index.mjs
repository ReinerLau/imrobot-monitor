// src/schema/app.ts
import { bigint, boolean, int, mysqlTable } from "drizzle-orm/mysql-core";
var app = mysqlTable("app", {
  id: int("id").autoincrement().primaryKey(),
  startTime: bigint("startTime", { mode: "number" }).notNull(),
  endTime: bigint("endTime", { mode: "number" }).notNull(),
  hasError: boolean("has_error"),
  behaviorId: int("behavior_id"),
  screenId: int("screen_id")
});

// src/schema/behavior.ts
import { int as int2, json, mysqlTable as mysqlTable2 } from "drizzle-orm/mysql-core";
var behavior = mysqlTable2("behavior", {
  id: int2("id").autoincrement().primaryKey(),
  data: json("data").notNull()
});

// src/schema/errors.ts
import { bigint as bigint2, int as int4, mysqlTable as mysqlTable4, text } from "drizzle-orm/mysql-core";

// src/schema/screen.ts
import { int as int3, json as json2, mysqlTable as mysqlTable3 } from "drizzle-orm/mysql-core";
var screen = mysqlTable3("screen", {
  id: int3("id").autoincrement().primaryKey(),
  data: json2("data").notNull()
});

// src/schema/errors.ts
var code = mysqlTable4("code", {
  id: int4("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int4("columnNumber").notNull(),
  lineNumber: int4("lineNumber").notNull(),
  time: text("time").notNull(),
  behaviorId: int4("behavior_id").references(() => behavior.id),
  screenId: int4("screen_id").references(() => screen.id)
});
var resource = mysqlTable4("resource", {
  id: int4("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull(),
  behaviorId: int4("behavior_id").references(() => behavior.id),
  screenId: int4("screen_id").references(() => screen.id)
});
var request = mysqlTable4("request", {
  id: int4("id").autoincrement().primaryKey(),
  status: int4("status").notNull(),
  response: text("response"),
  elapsedTime: bigint2("elapsedTime", { mode: "number" }).notNull(),
  url: text("url").notNull(),
  requestURL: text("requestURL").notNull(),
  time: text("time").notNull(),
  method: text("method").notNull(),
  requestData: text("requestData").notNull(),
  behaviorId: int4("behavior_id").references(() => behavior.id),
  screenId: int4("screen_id").references(() => screen.id)
});
export {
  app,
  behavior,
  code,
  request,
  resource,
  screen
};
