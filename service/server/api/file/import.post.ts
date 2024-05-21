export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);

  if (files) {
    const file = files[0];
    const jsonStr = new TextDecoder().decode(file.data);
    const json = JSON.parse(jsonStr);
    const events = json.events;
    const hash = json.hash;
    await db.insert(imEvents).values(events);
    await db.insert(imHash).values(hash);
  }

  return "success";
});
