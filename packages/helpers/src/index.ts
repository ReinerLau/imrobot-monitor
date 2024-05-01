export const global = {
  baseURL: "http://localhost:3001",
};

export enum BEHAVIORTYPES {
  CLICK = "click",
  ERROR = "error",
  XHR = "xhr",
  NAVIGATION = "navigation",
}

export const getTimestamp = () => {
  return Date.now();
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
  const result = navigator.sendBeacon(
    `${global.baseURL}${url}`,
    new Blob([JSON.stringify(data)], headers)
  );
  if (!result) {
    requestIdleCallback(() => {
      fetch(`${global.baseURL}${url}`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  }
}

export enum ErrorTypes {
  CODE = "code",
  RESOURCE = "resource",
  REQUEST = "request",
}
