export default defineEventHandler(async (event) => {
  return await db.query.project.findMany();
});
