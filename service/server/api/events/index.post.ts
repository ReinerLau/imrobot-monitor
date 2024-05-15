export default defineEventHandler(async (event) => {
  const { type, data, timestamp, token } = await readBody(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const result = await db
        .insert(imEvents)
        .values({
          projectId: project.id,
          data,
          type,
          timestamp,
        })
        .returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
