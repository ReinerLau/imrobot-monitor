export default defineEventHandler(async (event) => {
  return await db.query.record.findMany();
});
