import { config } from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";

config({ path: path.resolve(__dirname, "../../apps/api/.env") });

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
} satisfies Config;
