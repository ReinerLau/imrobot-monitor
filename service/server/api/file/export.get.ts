export default defineEventHandler(async () => {
  const events = await db.select().from(imEvents);
  const hash = await db.select().from(imHash);

  return {
    events,
    hash,
  };
});
