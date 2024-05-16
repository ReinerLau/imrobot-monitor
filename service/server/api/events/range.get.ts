import { eq, max, min } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token.toString()),
    });
    if (project) {
      const res = await db
        .select({
          endTime: max(imEvents.timestamp),
          startTime: min(imEvents.timestamp),
        })
        .from(imEvents)
        .where(eq(imEvents.projectId, project.id));

      return res[0];
    }
  }
});
