import {
  ErrorEventTypes,
  ErrorTypes,
  getTimestamp,
  reportData,
} from "@imrobot/shared";
import errorStackParser from "error-stack-parser";
import type { ResourceErrorTarget, XHRData } from "./types";
import { getErrorUid, hasHash } from "./utlis";

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
    return ErrorTypes.CODE;
  }
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
    return ErrorTypes.RESOURCE;
  }
};

/**
 * 处理 Promise 错误
 * @param ev 错误信息
 */
export const handleUnhandleRejection = (ev: PromiseRejectionEvent) => {
  if (ev.reason.name === "AxiosError") return; // 防止 axios 请求错误触发
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(
    ev.reason
  )[0];
  const errorData = {
    type: ErrorEventTypes.UNHANDLEDREJECTION,
    fileName,
    url: location.href,
    message: ev.reason.message,
    lineNumber,
    columnNumber,
    time: getTimestamp(),
  };
  const hash = getErrorUid(
    `${errorData.type}-${errorData.message}-${errorData.url}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    reportData("/error/code", errorData);
    return ErrorTypes.CODE;
  }
};

/**
 * 处理请求错误信息
 * @param data 请求信息
 */
export const handleHTTPRequest = (data: XHRData) => {
  const { url, sendTime, status, elapsedTime, response, requestData, method } =
    data;
  if (status === 0 || status! >= 400) {
    const errorData = {
      type: ErrorEventTypes.XHR,
      url: location.href,
      requestURL: url,
      time: sendTime,
      status,
      response,
      elapsedTime,
      method,
      requestData,
    };
    const hash = getErrorUid(
      `${errorData.type}-${errorData.response}-${errorData.method}-${errorData.status}`
    );

    if (!hasHash(hash)) {
      reportData("/error/request", errorData);
      return ErrorTypes.REQUEST;
    }
  }
};
