import { record } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const result = await db
    .insert(record)
    .values({
      projectId: 1,
      data,
      type: 1,
      createdAt: Date.now(),
    })
    .returning();

  return result;
});
