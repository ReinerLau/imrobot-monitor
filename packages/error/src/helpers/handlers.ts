import { getHash, getTimestamp } from "@imrobot/monitor-helpers";
import errorStackParser from "error-stack-parser";
import { monitor, parseSourceMap } from ".";
import { ResourceErrorTarget, XHRData } from "../../types";
import { hasHash } from "../utils";

export const handleError = async (err: Error) => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(err)[0];

  const res = await fetch(`${fileName}.map`);
  const sourceMap = await res.json();
  const data = await parseSourceMap({
    sourceMap,
    lineNumber: lineNumber!,
    columnNumber: columnNumber!,
  });

  const errorData = {
    fileName: data.file,
    url: location.href,
    message: err.message,
    lineNumber: data.line,
    columnNumber,
    code: data.code,
  };

  const hash = getHash(
    `${errorData.message}-${errorData.url}-${errorData.lineNumber}-${errorData.columnNumber}`
  );
  if (!hasHash(hash)) {
    monitor.reportData("/error", {
      type: 1,
      data: JSON.stringify(errorData),
      timestamp: Date.now(),
    });
  }
};

export const handleResourceError = ({
  src,
  localName,
  href,
}: ResourceErrorTarget) => {
  const errorData = {
    url: location.href,
    source: src || href,
    target: localName,
    time: getTimestamp(),
  };
  const hash = getHash(
    `${errorData.source}-${errorData.url}-${errorData.target}`
  );

  if (!hasHash(hash)) {
    monitor.reportData("/error", {
      type: 2,
      data: JSON.stringify(errorData),
      timestamp: Date.now(),
    });
  }
};

export const handleUnhandleRejection = async (ev: PromiseRejectionEvent) => {
  if (ev.reason.name === "AxiosError") return; // 防止 axios 请求错误触发
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(
    ev.reason
  )[0];

  const res = await fetch(`${fileName}.map`);
  const sourceMap = await res.json();
  const data = await parseSourceMap({
    sourceMap,
    lineNumber: lineNumber!,
    columnNumber: columnNumber!,
  });

  const errorData = {
    fileName,
    url: location.href,
    message: ev.reason.message,
    lineNumber,
    columnNumber,
    code: data.code,
  };

  const hash = getHash(
    `${errorData.message}-${errorData.url}-${errorData.columnNumber}`
  );

  if (!hasHash(hash)) {
    monitor.reportData("/error", {
      type: 1,
      data: JSON.stringify(errorData),
      timestamp: Date.now(),
    });
  }
};

export const handleHTTPRequest = (data: XHRData) => {
  const { url, sendTime, status, elapsedTime, response, requestData, method } =
    data;
  if (status === 0 || status! >= 400) {
    const errorData = {
      url: location.href,
      requestURL: url,
      time: sendTime,
      status,
      response,
      elapsedTime,
      method,
      requestData,
    };
    const hash = getHash(
      `${errorData.response}-${errorData.method}-${errorData.status}`
    );

    if (!hasHash(hash)) {
      monitor.reportData("/error", {
        type: 3,
        data: JSON.stringify(errorData),
        timestamp: Date.now(),
      });
    }
  }
};
