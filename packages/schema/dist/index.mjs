// src/schema/behavior.ts
import { int, json, mysqlTable } from "drizzle-orm/mysql-core";
var behavior = mysqlTable("behavior", {
  id: int("id").autoincrement().primaryKey(),
  data: json("data").notNull()
});

// src/schema/errors.ts
import { bigint, int as int3, mysqlTable as mysqlTable3, text } from "drizzle-orm/mysql-core";

// src/schema/screen.ts
import { int as int2, json as json2, mysqlTable as mysqlTable2 } from "drizzle-orm/mysql-core";
var screen = mysqlTable2("screen", {
  id: int2("id").autoincrement().primaryKey(),
  data: json2("data").notNull()
});

// src/schema/errors.ts
var code = mysqlTable3("code", {
  id: int3("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int3("columnNumber").notNull(),
  lineNumber: int3("lineNumber").notNull(),
  time: text("time").notNull(),
  behaviorId: int3("behavior_id").references(() => behavior.id),
  screenId: int3("screen_id").references(() => screen.id)
});
var resource = mysqlTable3("resource", {
  id: int3("id").autoincrement().primaryKey(),
  source: text("source").notNull(),
  target: text("target").notNull(),
  url: text("url").notNull(),
  time: text("time").notNull(),
  behaviorId: int3("behavior_id").references(() => behavior.id),
  screenId: int3("screen_id").references(() => screen.id)
});
var request = mysqlTable3("request", {
  id: int3("id").autoincrement().primaryKey(),
  status: int3("status").notNull(),
  response: text("response"),
  elapsedTime: bigint("elapsedTime", { mode: "number" }).notNull(),
  url: text("url").notNull(),
  requestURL: text("requestURL").notNull(),
  time: text("time").notNull(),
  method: text("method").notNull(),
  requestData: text("requestData").notNull(),
  behaviorId: int3("behavior_id").references(() => behavior.id),
  screenId: int3("screen_id").references(() => screen.id)
});
export {
  behavior,
  code,
  request,
  resource,
  screen
};
