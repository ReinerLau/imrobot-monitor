import { SourceMapConsumer } from "source-map-js";

export enum EventTypes {
  VUE = "vue",
  ERROR = "error",
  RESOURCE = "resource",
  UNHANDLEDREJECTION = "unhandledrejection",
  XHR = "xhr",
}

export async function parseSourceMap({
  sourceMap,
  lineNumber,
  columnNumber,
}: {
  sourceMap: any;
  lineNumber: number;
  columnNumber: number;
}) {
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
    line: result.line,
    code: parseCode({ code, line: result.line }),
  };
}

function parseCode({
  code,
  line,
  sliceNumber = 10,
}: {
  code: string;
  line: number;
  sliceNumber?: number;
}) {
  let codeList = code.split("\n").map((code, index) => [index + 1, code]);

  const upperNumber = line - sliceNumber > 0 ? line - sliceNumber : 0;
  const lowerNumber =
    line + sliceNumber <= codeList.length - 1
      ? line + sliceNumber
      : codeList.length - 1;

  codeList = [
    ...codeList.slice(upperNumber, line),
    ...codeList.slice(line, lowerNumber),
  ];

  return JSON.stringify(codeList);
}
