import fs from "fs";
import path from "path";
export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  const { token } = getQuery(event);

  if (files && token) {
    const file = files[0];
    const filePath = path.join(process.cwd(), "/public", token.toString());
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    fs.writeFileSync(path.join(filePath, file.filename!), file.data);
  }
});
