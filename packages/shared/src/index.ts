import dayjs from "dayjs";

/**
 * 共享变量
 */
export const global = {
  /**
   * 是否捕获到错误
   */
  hasError: false,
};

/**
 * 行为栈类型
 * @property CLICK - 点击事件
 */
export enum BEHAVIORTYPES {
  CLICK = "click",
  ERROR = "error",
  XHR = "xhr",
  NAVIGATION = "navigation",
}

/**
 * 返回当前时间戳
 * @returns 当前时间戳
 */
export const getTimestamp = () => {
  return dayjs().toString();
};

export type extensionInstallEvent = (options?: any) => void;

export interface Extension {
  install: extensionInstallEvent;
  afterEvent?: Function;
}

export enum EventTypes {
  VUE = "vue",
  ERROR = "error",
  RESOURCE = "resource",
  UNHANDLEDREJECTION = "unhandledrejection",
  XHR = "xhr",
}

export enum ErrorEventTypes {
  VUE = "vue_error",
  ERROR = "error",
  RESOURCE = "resource_error",
  UNHANDLEDREJECTION = "unhandledrejection_error",
  XHR = "xhr_error",
}

export enum NormalEventTypes {
  XHR = "xhr_normal",
}

export function reportData(url: string, data: Record<string, any>) {
  const headers = {
    type: "application/json",
  };
  navigator.sendBeacon(url, new Blob([JSON.stringify(data)], headers));
}
