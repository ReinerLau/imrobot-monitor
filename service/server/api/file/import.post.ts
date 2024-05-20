import fs from "fs";
import path from "path";
export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);

  if (files) {
    const file = files[0];
    const filepath = path.join(process.cwd(), "/public", file.filename!);
    fs.writeFileSync(filepath, file.data);
  }
});
