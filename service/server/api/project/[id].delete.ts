import { eq } from "drizzle-orm";
import { project } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return await db
    .delete(project)
    .where(eq(project.id, Number(id)))
    .returning();
});
