import extract from "extract-zip";
import fs from "fs-extra";
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

    await extract(path.join(filePath, file.filename!), {
      dir: filePath,
    });

    fs.removeSync(path.join(filePath, file.filename!));

    if (fs.existsSync(path.join(filePath, "dist"))) {
      const content = fs.readdirSync(path.join(filePath, "dist"));
      content.forEach((name) => {
        fs.moveSync(
          path.join(filePath, "dist", name),
          path.join(filePath, name)
        );
      });
    }

    fs.removeSync(path.join(filePath, "dist"));

    return "success";
  }
});
