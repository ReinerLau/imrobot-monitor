import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return await db
    .delete(imProject)
    .where(eq(imProject.id, Number(id)))
    .returning();
});
