import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schema.ts",
  out: "./database",
  driver: "better-sqlite",
} satisfies Config;
