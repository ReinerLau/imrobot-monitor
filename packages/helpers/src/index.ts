import { Monitor } from "./monitor";
export * from "./monitor";

export const global = {
  baseURL: "http://localhost:3001",
};

export const getTimestamp = () => {
  return Date.now();
};

export type extensionInstallEvent = (monitor: Monitor, options?: any) => void;

export interface Extension {
  install: extensionInstallEvent;
  afterEvent?: Function;
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
