import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const imProject = sqliteTable("im_project", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  token: text("token").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const imError = sqliteTable("im_error", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => imProject.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const imAction = sqliteTable("im_action", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => imProject.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const imRecord = sqliteTable("im_record", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => imProject.id),
  data: blob("data", { mode: "json" }).notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});

export const imHash = sqliteTable("im_hash", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => imProject.id),
  hash: text("hash").notNull(),
  data: text("data").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const imEvents = sqliteTable("im_events", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => imProject.id),
  data: text("data").notNull(),
  timestamp: integer("timestamp").notNull(),
  type: integer("type", { mode: "number" }).notNull(),
  createdAt: integer("created_at").notNull(),
});
