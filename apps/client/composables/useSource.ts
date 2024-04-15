import axios from "axios";

interface Data {
  url: string;
  lineNumber: number;
  columnNumber: number;
  fileName: string;
}

const code = ref<string>("");
const file = ref<string>("");
const dialogVisible = ref(false);

export default function () {
  async function showSource(rowData: Data) {
    const res = await axios.get("http://localhost:3001/error/getMap", {
      params: {
        fileName: rowData.fileName,
      },
    });
    dialogVisible.value = true;
    if (process.env.NODE_ENV === "development") {
      file.value = rowData.fileName;
      code.value = renderCode({ code: res.data, line: rowData.lineNumber - 1 });
    } else {
      const result = await parseSourceMap({
        sourceMap: res.data,
        lineNumber: rowData.lineNumber,
        columnNumber: rowData.columnNumber,
      });
      file.value = result.file;
      code.value = result.code;
    }
  }

  return {
    code,
    file,
    dialogVisible,
    showSource,
  };
}
