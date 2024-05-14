import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const project = sqliteTable("project", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  token: text("token").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const error = sqliteTable("error", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const action = sqliteTable("action", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const record = sqliteTable("record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const hash = sqliteTable("record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  hash: text("hash").notNull(),
  data: text("data").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const events = sqliteTable("record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => project.id),
  data: text("data").notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});
