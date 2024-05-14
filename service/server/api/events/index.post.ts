export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const { type, data, timestamp } = await readBody(event);

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
          createdAt: Date.now(),
        })
        .returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
