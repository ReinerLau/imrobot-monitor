export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, String(token)),
    });

    if (project) {
      const result = await db.query.imError.findMany({
        where: (imError, { eq }) => eq(imError.projectId, project.id),
      });
      return result;
    }
  } else {
    return null;
  }
});
