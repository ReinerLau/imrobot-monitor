export default defineEventHandler(async (event) => {
  const { token, data, type, timestamp } = await readBody(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const result = await db
        .insert(imError)
        .values({
          projectId: project.id,
          type,
          data,
          timestamp,
        })
        .returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
