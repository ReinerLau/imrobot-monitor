import errorStackParser from "error-stack-parser";
import { getErrorUid, getTimestamp } from "./utlis";
import { eventTypes } from "./shared";
import type { ResourceErrorTarget } from "./types";

/**
 * 处理代码运行错误和异步错误
 * @param err 错误详情
 */
export const handleError = (err: Error): void => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(err)[0];
  const errorData = {
    type: eventTypes.ERROR,
    fileName,
    message: err.message,
    lineNumber,
    columnNumber,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.fileName}-${errorData.columnNumber}`
  );
  console.log(hash);
  console.log(errorData);
  // TODO: 上报
};

/**
 * 处理加载资源错误
 * @param err 错误详情
 */
export const handleResourceError = ({
  src,
  localName,
}: ResourceErrorTarget): void => {
  const errorData = {
    type: eventTypes.RESOURCE,
    message: src,
    name: localName,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.name}`
  );
  console.log(hash);
  console.log(errorData);
  // TODO: 上报
};
