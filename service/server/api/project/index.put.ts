import { eq } from "drizzle-orm";
import { project } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { id, name } = await readBody(event);

  const result = await db
    .update(project)
    .set({ name })
    .where(eq(project.id, id))
    .returning();

  return result;
});
