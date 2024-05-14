export default defineEventHandler(async (event) => {
  const { events, token } = await readBody(event);

  const project = await db.query.imProject.findFirst({
    where: (imProject, { eq }) => eq(imProject.token, token),
  });

  if (project) {
    const result = await db
      .insert(imRecord)
      .values({
        projectId: project.id,
        data: events,
        type: 1,
        createdAt: Date.now(),
      })
      .returning();

    return result;
  }
});
