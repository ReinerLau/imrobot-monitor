import { randomUUID } from "crypto";
import { project } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);

  const result = await db
    .insert(project)
    .values({
      name,
      token: randomUUID(),
      createdAt: Date.now(),
    })
    .returning();

  return result;
});
