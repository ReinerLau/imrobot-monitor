import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return await db
    .delete(imRecord)
    .where(eq(imRecord.id, Number(id)))
    .returning();
});
