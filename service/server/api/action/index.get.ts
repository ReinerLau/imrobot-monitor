export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const result = await db.query.imAction.findMany({});
      return result;
    }
  } else {
    return "Not Found Token";
  }
});
