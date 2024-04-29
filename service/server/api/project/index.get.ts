// import { db } from "@/server/sqlite-service";

export default defineEventHandler(async (event) => {
  const result = await db.query.project.findMany();
  return result;
});
