import errorStackParser from "error-stack-parser";
import { getErrorUid } from "./utlis";
import { eventTypes } from "./shared";
import type { ResourceErrorTarget, XHRData } from "./types";
import { getTimestamp } from "@imrobot/shared";

/**
 * 处理代码运行错误和异步错误
 * @param err 错误详情
 */
export const handleError = (err: Error) => {
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
  // TODO: 上报
  fetch("/reportData", {
    method: "POST",
    body: JSON.stringify(errorData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return errorData;
};

/**
 * 处理加载资源错误
 * @param err 错误详情
 */
export const handleResourceError = ({
  src,
  localName,
}: ResourceErrorTarget) => {
  const errorData = {
    type: eventTypes.RESOURCE,
    message: src,
    name: localName,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.name}`
  );
  // TODO: 上报
  return errorData;
};

/**
 * 处理 Promise 错误
 * @param ev 错误信息
 */
export const handleUnhandleRejection = (ev: PromiseRejectionEvent) => {
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
  // TODO: 上报
  return errorData;
};

/**
 * 处理请求错误信息
 * @param data 请求信息
 */
export const handleHTTPRequest = (data: XHRData) => {
  const { url, sendTime, status, elapsedTime, response, requestData, method } =
    data;
  let message = "";
  if (status === 0) {
    message = `请求失败，status 值为：${status}`;
  } else if (status! < 400) {
    message = `请求成功，status 值为：${status}`;
  } else {
    message = `请求失败，status 值为：${status}，报错信息为：${response}`;
  }
  const errorData = {
    type: eventTypes.XHR,
    url,
    time: sendTime,
    status,
    message,
    elapsedTime,
    method,
    requestData,
  };
  // TODO: 上报
  return errorData;
};
