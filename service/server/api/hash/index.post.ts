export default defineEventHandler(async (event) => {
  const { md5, data, timestamp, token } = await readBody(event);

  if (token) {
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
