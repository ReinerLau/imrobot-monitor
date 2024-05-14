import { between } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { token } = getHeaders(event);

  if (token) {
    const project = await db.query.imProject.findFirst({
      where: (imProject, { eq }) => eq(imProject.token, token),
    });

    if (project) {
      const { startTime, endTime } = getQuery(event);

      const result = await db.query.imEvents.findMany({
        where: between(imEvents.timestamp, Number(startTime), Number(endTime)),
      });
      return result;
    }
  } else {
    return "Not Found Token";
  }
});
