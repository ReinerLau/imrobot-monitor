import { eq } from "drizzle-orm";
import { record } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const project = await db.query.project.findFirst({
    where: (project, { eq }) => eq(project.token, String(query.token)),
  });

  if (project) {
    const result = await db.query.record.findMany({
      where: eq(record.projectId, project.id),
    });
    return result;
  }
});
