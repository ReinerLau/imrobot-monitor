export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const { hash, data, timestamp } = await readBody(event);

    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const result = await db
        .insert(imHash)
        .values({
          projectId: project.id,
          data,
          hash,
          timestamp,
        })
        .returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
