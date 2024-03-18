import { SourceMapConsumer } from "source-map-js";

export const parseSourceMap = async (
  sourceMap: any,
  lineNumber: number,
  columnNumber: number
) => {
  const { sourcesContent, sources } = sourceMap;

  const consumer = await new SourceMapConsumer(sourceMap);
  const result = consumer.originalPositionFor({
    line: lineNumber,
    column: columnNumber,
  });

  let index = sources.indexOf(result.source);

  const code = sourcesContent[index];
  const codeList = code.split("\n");

  //   return codeList.join("");
  return code;
};
