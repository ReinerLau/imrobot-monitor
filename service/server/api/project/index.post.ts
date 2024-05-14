import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);

  const result = await db
    .insert(imProject)
    .values({
      name,
      token: randomUUID(),
      createdAt: Date.now(),
    })
    .returning();

  return result;
});
