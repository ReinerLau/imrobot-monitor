export default defineEventHandler(async (event) => {
  const { token, data } = await readBody(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const newData = data.map((item: any) => {
        return {
          ...item,
          projectId: project.id,
        };
      });

      const result = await db.insert(imAction).values(newData).returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
