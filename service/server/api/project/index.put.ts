import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { id, name } = await readBody(event);

  const result = await db
    .update(imProject)
    .set({ name })
    .where(eq(imProject.id, id))
    .returning();

  return result;
});
