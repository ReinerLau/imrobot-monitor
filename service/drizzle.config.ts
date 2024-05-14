import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  out: "./migrations",
  schema: "./server/utils/schema.ts",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
