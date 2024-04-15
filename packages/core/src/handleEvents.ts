import {
  ErrorEventTypes,
  getTimestamp,
  NormalEventTypes,
  reportData,
} from "@imrobot/shared";
import errorStackParser from "error-stack-parser";
import type { ResourceErrorTarget, XHRData } from "./types";
import { getErrorUid, hasHash } from "./utlis";

/**
 * 处理代码运行错误和异步错误
 * @param err 错误详情
 */
export const handleError = (err: Error) => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(err)[0];

  const errorData = {
    type: ErrorEventTypes.ERROR,
    fileName,
    url: location.href,
    message: err.message,
    lineNumber,
    columnNumber,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.url}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    reportData("/error/code", errorData);
  }

  return errorData;
};

/**
 * 处理加载资源错误
 * @param err 错误详情
 */
export const handleResourceError = ({
  src,
  localName,
  href,
}: ResourceErrorTarget) => {
  const errorData = {
    url: location.href,
    type: ErrorEventTypes.RESOURCE,
    source: src || href,
    target: localName,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.source}-${errorData.url}-${errorData.target}`
  );

  if (!hasHash(hash)) {
    reportData("/error/resource", errorData);
  }

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
    type: ErrorEventTypes.UNHANDLEDREJECTION,
    message: ev.reason.message,
    url: fileName,
    lineNumber,
    columnNumber,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.url}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    reportData("/error", errorData);
  }

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
  let type = "";
  if (status === 0) {
    message = `请求失败，status 值为：${status}`;
    type = ErrorEventTypes.XHR;
  } else if (status! < 400) {
    message = `请求成功，status 值为：${status}`;
    type = NormalEventTypes.XHR;
  } else {
    message = `请求失败，status 值为：${status}，报错信息为：${response}`;
    type = ErrorEventTypes.XHR;
  }
  const errorData = {
    type,
    url,
    time: sendTime,
    status,
    message,
    elapsedTime,
    method,
    requestData,
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.method}-${errorData.status}`
  );

  if (!hasHash(hash)) {
    reportData("/error", errorData);
  }

  return errorData;
};
