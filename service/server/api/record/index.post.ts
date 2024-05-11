import { record } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { events, token } = await readBody(event);

  const project = await db.query.project.findFirst({
    where: (project, { eq }) => eq(project.token, token),
  });

  if (project) {
    const result = await db
      .insert(record)
      .values({
        projectId: project.id,
        data: events,
        type: 1,
        createdAt: Date.now(),
      })
      .returning();

    return result;
  }
});
