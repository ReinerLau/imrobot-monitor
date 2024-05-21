export default defineEventHandler(async (event) => {
  const { md5 } = getQuery(event);

  let result = null;
  if (md5) {
    result = await db.query.imHash.findFirst({
      where: (imHash, { eq }) => eq(imHash.md5, md5.toString()),
    });
  }

  return result ? true : false;
});
