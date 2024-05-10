import { eq } from "drizzle-orm";
import { record } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return await db
    .delete(record)
    .where(eq(record.id, Number(id)))
    .returning();
});
