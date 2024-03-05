import errorStackParser from "error-stack-parser";
import { getErrorUid, getTimestamp } from "./utlis";
import { eventTypes } from "./shared";

/**
 * 处理代码运行错误
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
    `${eventTypes.ERROR}-${err.message}-${fileName}-${columnNumber}`
  );
  console.log(hash);
  console.log(errorData);
  // TODO: 上报
};
