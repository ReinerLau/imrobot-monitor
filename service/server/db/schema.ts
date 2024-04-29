import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const project = sqliteTable("project", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  token: text("token").notNull(),
  createAt: integer("create_at", { mode: "timestamp" }).notNull(),
});

export const error = sqliteTable("error", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createAt: integer("create_at", { mode: "timestamp" }).notNull(),
});

export const action = sqliteTable("action", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createAt: integer("create_at", { mode: "timestamp" }).notNull(),
});

export const record = sqliteTable("record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createAt: integer("create_at", { mode: "timestamp" }).notNull(),
});
