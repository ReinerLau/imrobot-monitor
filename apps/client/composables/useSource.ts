import axios from "axios";
import hljs from "highlight.js";
import markdownit from "markdown-it";
import markdownitHighlight from "markdown-it-highlightjs";
import { SourceMapConsumer } from "source-map-js";
import type { SourceInfo } from "~/types";

interface Data {
  url: string;
  lineNumber: number;
  columnNumber: number;
  fileName: string;
}

const code = ref<string>("");
const file = ref<string>("");
const dialogVisible = ref(false);

const md: any = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
}).use(markdownitHighlight);

async function parseSourceMap({
  sourceMap,
  lineNumber,
  columnNumber,
}: SourceInfo) {
  const { sourcesContent, sources } = sourceMap;

  const consumer = await new SourceMapConsumer(sourceMap);
  const result = consumer.originalPositionFor({
    line: lineNumber,
    column: columnNumber,
  });

  let index = sources.indexOf(result.source);

  const code: string = sourcesContent[index];

  return {
    file: result.source,
    code: renderCode({ code, line: result.line }),
  };
}

function renderCode({
  code,
  line,
  sliceNumber = 10,
}: {
  code: string;
  line: number;
  sliceNumber?: number;
}) {
  let codeList = code.split("\n");

  const realLine = line - 1;

  codeList = codeList.map((code, index) => `   ${index + 1}  ${code}`);

  codeList[realLine] = "-" + codeList[realLine].substring(1);

  const upperNumber = realLine - sliceNumber > 0 ? realLine - sliceNumber : 0;
  const lowerNumber =
    realLine + sliceNumber <= codeList.length - 1
      ? realLine + sliceNumber
      : codeList.length - 1;

  codeList = [
    ...codeList.slice(upperNumber, realLine),
    ...codeList.slice(realLine, lowerNumber),
  ];

  code = codeList.join("\n");

  return md.render("```diff\n" + code + "\n```");
}

function handleFileName(str: string) {
  if (isDev()) {
    const match = str.match(/\/src([^?]+)/);
    return match ? match[0] : "";
  } else {
    const match = str.match(/\/([^/]+)$/);
    return match ? match[1] : "";
  }
}

function isDev() {
  return process.env.NODE_ENV === "development";
}

export const useSource = () => {
  async function showSource(rowData: Data) {
    const res = await axios.get("http://localhost:3001/error/getMap", {
      params: {
        fileName: handleFileName(rowData.fileName),
      },
    });
    dialogVisible.value = true;
    if (isDev()) {
      file.value = rowData.fileName;
      code.value = renderCode({ code: res.data, line: rowData.lineNumber });
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
};
