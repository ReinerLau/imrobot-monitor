export default defineEventHandler(async (event) => {
  const { events, token } = await readBody(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const insertedEvents = events.map((item: any) => ({
        projectId: project.id,
        ...item,
      }));
      const result = await db
        .insert(imEvents)
        .values(insertedEvents)
        .returning();

      return result;
    }
  } else {
    return "Not Found Token";
  }
});
