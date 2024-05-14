export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const { data, timestamp } = await readBody(event);

      const result = await db
        .insert(imAction)
        .values({
          projectId: project.id,
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
