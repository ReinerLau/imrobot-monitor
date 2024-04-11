import { SourceMapConsumer } from "source-map-js";
import type { SourceInfo } from "~/types";
import markdownit from "markdown-it";
import markdownitHighlight from "markdown-it-highlightjs";
import hljs from "highlight.js";

const md = markdownit().use(markdownitHighlight);

export async function parseSourceMap({
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

  let code: string = sourcesContent[index];
  const codeList = code.split("\n");

  codeList[lineNumber] = "+ " + codeList[lineNumber];

  code = codeList.join("\n");

  return md.render("```diff\n" + code + "```");

  // console.log(test.replace("<pre>", "").replace("<code>", ""));

  // return codeList.map((item: string) => replaceAll(item));
  // return codeList;
  // return test.replace("<pre>", "").replace("<code>", "");
}
