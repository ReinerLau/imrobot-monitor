import { SourceMapConsumer } from "source-map-js";
import type { SourceInfo } from "~/types";
import markdownit from "markdown-it";
import markdownitHighlight from "markdown-it-highlightjs";
import hljs from "highlight.js";

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

export async function parseSourceMap({
  sourceMap,
  lineNumber,
  columnNumber,
  sliceNumber = 10,
}: SourceInfo) {
  const { sourcesContent, sources } = sourceMap;

  const consumer = await new SourceMapConsumer(sourceMap);
  const result = consumer.originalPositionFor({
    line: lineNumber,
    column: columnNumber,
  });

  let index = sources.indexOf(result.source);

  let code: string = sourcesContent[index];
  let codeList = code.split("\n");

  const realLine = result.line - 1;

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

  return {
    file: result.source,
    code: md.render("```diff\n" + code + "\n```"),
  };
}
