import hljs from "highlight.js";
import markdownit from "markdown-it";
import markdownitHighlight from "markdown-it-highlightjs";

interface Data {
  url: string;
  lineNumber: number;
  columnNumber: number;
  fileName: string;
  code: string;
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

export default () => {
  function renderCode(code: string, realLine: number) {
    let codeList = JSON.parse(code);

    codeList = codeList.map((item: any) => `   ${item[0]}  ${item[1]}`);

    codeList[realLine - 1] = "-" + codeList[realLine - 1].substring(1);

    code = codeList.join("\n");

    return md.render("```diff\n" + code + "\n```");
  }

  async function showSource(rowData: Data) {
    dialogVisible.value = true;
    file.value = rowData.fileName;
    code.value = renderCode(rowData.code, rowData.lineNumber);
  }

  return {
    code,
    file,
    dialogVisible,
    showSource,
    renderCode,
  };
};
