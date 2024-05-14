export default defineEventHandler(async (event) => {
  const { md5 } = getQuery(event);

  const result = await db.query.imHash.findFirst({
    where: (imHash, { eq }) => eq(imHash.md5, String(md5)),
  });

  return result ? true : false;
});
