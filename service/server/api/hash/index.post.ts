export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const { md5, data, timestamp } = await readBody(event);

    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const result = await db
        .insert(imHash)
        .values({
          projectId: project.id,
          md5,
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
