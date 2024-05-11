import { Monitor } from "./monitor";
export * from "./monitor";

export const getTimestamp = () => {
  return Date.now();
};

export type extensionInstallEvent = (monitor: Monitor, options?: any) => void;

export interface Extension {
  install: extensionInstallEvent;
  afterEvent?: Function;
}
