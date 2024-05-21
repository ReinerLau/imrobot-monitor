import { eq, max, min } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);

  if (token) {
    const res = await db
      .select({
        endTime: max(imEvents.timestamp),
        startTime: min(imEvents.timestamp),
      })
      .from(imEvents)
      .where(eq(imEvents.token, token.toString()));

    return res[0];
  }
});
