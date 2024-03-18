import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/getMap", (req, res) => {
  let fileName = req.query.fileName as string;
  let mapFile = path.join(
    __filename,
    "..",
    "..",
    "test-example",
    "dist",
    `${fileName}.map`
  );
  fs.readFile(mapFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

const errorList: any[] = [];

app.post("/reportData", (req, res) => {
  errorList.push(req.body);

  res.send({
    code: 200,
    message: "上报成功",
  });
});

app.get("/getErrorList", (req, res) => {
  res.send({
    code: 200,
    data: errorList,
  });
});

app.listen(5174, () => {
  console.log("Server is running at http://localhost:5174");
});
