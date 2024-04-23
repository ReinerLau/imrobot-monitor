var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  app: () => app,
  behavior: () => behavior,
  code: () => code,
  request: () => request,
  resource: () => resource,
  screen: () => screen
});
module.exports = __toCommonJS(src_exports);

// src/schema/app.ts
var import_mysql_core = require("drizzle-orm/mysql-core");
var app = (0, import_mysql_core.mysqlTable)("app", {
  id: (0, import_mysql_core.int)("id").autoincrement().primaryKey(),
  time: (0, import_mysql_core.bigint)("time", { mode: "number" }).notNull()
  // hasError: boolean("has_error"),
  // behaviorId: int("behavior_id"),
  // screenId: int("screen_id"),
});

// src/schema/behavior.ts
var import_mysql_core2 = require("drizzle-orm/mysql-core");
var behavior = (0, import_mysql_core2.mysqlTable)("behavior", {
  id: (0, import_mysql_core2.int)("id").autoincrement().primaryKey(),
  data: (0, import_mysql_core2.json)("data").notNull()
});

// src/schema/errors.ts
var import_mysql_core3 = require("drizzle-orm/mysql-core");
var code = (0, import_mysql_core3.mysqlTable)("code", {
  id: (0, import_mysql_core3.int)("id").autoincrement().primaryKey(),
  message: (0, import_mysql_core3.text)("message").notNull(),
  fileName: (0, import_mysql_core3.text)("fileName").notNull(),
  url: (0, import_mysql_core3.text)("url").notNull(),
  columnNumber: (0, import_mysql_core3.int)("columnNumber").notNull(),
  lineNumber: (0, import_mysql_core3.int)("lineNumber").notNull(),
  time: (0, import_mysql_core3.text)("time").notNull(),
  behaviorId: (0, import_mysql_core3.int)("behavior_id"),
  screenId: (0, import_mysql_core3.int)("screen_id")
});
var resource = (0, import_mysql_core3.mysqlTable)("resource", {
  id: (0, import_mysql_core3.int)("id").autoincrement().primaryKey(),
  source: (0, import_mysql_core3.text)("source").notNull(),
  target: (0, import_mysql_core3.text)("target").notNull(),
  url: (0, import_mysql_core3.text)("url").notNull(),
  time: (0, import_mysql_core3.text)("time").notNull(),
  behaviorId: (0, import_mysql_core3.int)("behavior_id"),
  screenId: (0, import_mysql_core3.int)("screen_id")
});
var request = (0, import_mysql_core3.mysqlTable)("request", {
  id: (0, import_mysql_core3.int)("id").autoincrement().primaryKey(),
  status: (0, import_mysql_core3.int)("status").notNull(),
  response: (0, import_mysql_core3.text)("response"),
  elapsedTime: (0, import_mysql_core3.bigint)("elapsedTime", { mode: "number" }).notNull(),
  url: (0, import_mysql_core3.text)("url").notNull(),
  requestURL: (0, import_mysql_core3.text)("requestURL").notNull(),
  time: (0, import_mysql_core3.text)("time").notNull(),
  method: (0, import_mysql_core3.text)("method").notNull(),
  requestData: (0, import_mysql_core3.text)("requestData").notNull(),
  behaviorId: (0, import_mysql_core3.int)("behavior_id"),
  screenId: (0, import_mysql_core3.int)("screen_id")
});

// src/schema/screen.ts
var import_mysql_core4 = require("drizzle-orm/mysql-core");
var screen = (0, import_mysql_core4.mysqlTable)("screen", {
  id: (0, import_mysql_core4.int)("id").autoincrement().primaryKey(),
  time: (0, import_mysql_core4.bigint)("time", { mode: "number" }).notNull(),
  data: (0, import_mysql_core4.json)("data").notNull()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app,
  behavior,
  code,
  request,
  resource,
  screen
});
