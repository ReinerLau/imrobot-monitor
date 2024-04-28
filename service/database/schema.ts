import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const app = sqliteTable("app", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  token: text("token").notNull(),
  createAt: integer("id", { mode: "timestamp" }).notNull(),
});

export const abnormal = sqliteTable("abnormal", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  appId: integer("app_id").references(() => app.id),
  data: blob("blob", { mode: "json" }).notNull(),
  type: integer("id", { mode: "number" }).notNull(),
  createAt: integer("id", { mode: "timestamp" }).notNull(),
});

export const action = sqliteTable("action", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  appId: integer("app_id").references(() => app.id),
  data: blob("blob", { mode: "json" }).notNull(),
  type: integer("id", { mode: "number" }).notNull(),
  createAt: integer("id", { mode: "timestamp" }).notNull(),
});

export const record = sqliteTable("record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  appId: integer("app_id").references(() => app.id),
  data: blob("blob", { mode: "json" }).notNull(),
  type: integer("id", { mode: "number" }).notNull(),
  createAt: integer("id", { mode: "timestamp" }).notNull(),
});
