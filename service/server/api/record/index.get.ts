import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const project = await db.query.imProject.findFirst({
    where: (imProject, { eq }) => eq(imProject.token, String(query.token)),
  });

  if (project) {
    const result = await db.query.imRecord.findMany({
      where: eq(imRecord.projectId, project.id),
    });
    return result;
  }
});
