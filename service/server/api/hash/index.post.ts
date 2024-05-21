export default defineEventHandler(async (event) => {
  const { md5, data, timestamp, token } = await readBody(event);

  if (token) {
    const result = await db
      .insert(imHash)
      .values({
        token,
        md5,
        data,
        timestamp,
      })
      .returning();

    return result;
  } else {
    return "Not Found Token";
  }
});
