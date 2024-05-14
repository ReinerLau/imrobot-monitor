export default defineEventHandler(async (event) => {
  const { hash } = getQuery(event);

  const result = await db.query.imHash.findFirst({
    where: (imHash, { eq }) => eq(imHash.hash, String(hash)),
  });

  return result ? true : false;
});
