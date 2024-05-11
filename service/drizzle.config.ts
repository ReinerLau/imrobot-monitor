import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  out: "./server/db/migrations",
  schema: "./server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
