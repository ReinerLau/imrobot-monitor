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
  code: () => code
});
module.exports = __toCommonJS(src_exports);

// src/schema/errors.ts
var import_mysql_core = require("drizzle-orm/mysql-core");
var code = (0, import_mysql_core.mysqlTable)("code", {
  id: (0, import_mysql_core.int)("id").autoincrement().primaryKey(),
  message: (0, import_mysql_core.text)("message").notNull(),
  fileName: (0, import_mysql_core.text)("fileName").notNull(),
  url: (0, import_mysql_core.text)("url").notNull(),
  columnNumber: (0, import_mysql_core.int)("columnNumber").notNull(),
  lineNumber: (0, import_mysql_core.int)("lineNumber").notNull(),
  time: (0, import_mysql_core.text)("time").notNull()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  code
});
