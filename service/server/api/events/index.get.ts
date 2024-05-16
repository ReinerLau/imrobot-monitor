import { between, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { startTime, endTime, token } = getQuery(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token.toString()),
    });

    if (project) {
      const result = await db.query.imEvents.findMany({
        where: between(imEvents.timestamp, Number(startTime), Number(endTime)),
      });

      const full = result.filter((item) => item.type === 2);
      const promises = full.map((item) => {
        return new Promise(async (resolve) => {
          const full = await db.query.imHash.findFirst({
            where: eq(imHash.md5, item.data),
          });
          item.data = full?.data || "{}";

          resolve(true);
        });
      });
      await Promise.all(promises);

      return result;
    }
  }
});
