export default defineEventHandler(async (event) => {
  const { events, token } = await readBody(event);

  if (token) {
    const insertedEvents = events.map((item: any) => ({
      token,
      ...item,
    }));
    const result = await db.insert(imEvents).values(insertedEvents).returning();

    return result;
  } else {
    return "Not Found Token";
  }
});
