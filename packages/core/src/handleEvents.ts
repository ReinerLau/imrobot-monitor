import errorStackParser from "error-stack-parser";
import { getErrorUid, getTimestamp } from "./utlis";
import { eventTypes } from "./shared";
import type { ResourceErrorTarget, XHRData } from "./types";

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
  fetch("/reportData", {
    method: "POST",
    body: JSON.stringify(errorData),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

/**
 * 处理 Promise 错误
 * @param ev 错误信息
 */
export const handleUnhandleRejection = (ev: PromiseRejectionEvent): void => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(
    ev.reason
  )[0];
  const errorData = {
    type: eventTypes.UNHANDLEDREJECTION,
    message: ev.reason.message,
    fileName,
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
 * 处理请求错误信息
 * @param data 请求信息
 */
export const handleHTTPRequest = (data: XHRData) => {
  const { url, sendTime, status, elapsedTime, response, requestData, method } =
    data;
  let message = "";
  if (status! >= 500) {
    message = `接口报错，报错信息为：${response}`;
  } else {
    message = `请求失败，status 值为：${status}`;
  }
  const errorData = {
    url,
    sendTime,
    status,
    message,
    elapsedTime,
    method,
    requestData,
  };
  console.log(errorData);
  // TODO: 上报
};
