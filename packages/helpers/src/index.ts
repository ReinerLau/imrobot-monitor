import md5 from "md5";
import { Monitor } from "./monitor";
export * from "../types/index.d";
export * from "./monitor";

export const getTimestamp = () => {
  return Date.now();
};

export type extensionInstallEvent = (monitor: Monitor, options?: any) => void;

export interface Extension {
  install: extensionInstallEvent;
  afterEvent?: Function;
}

export const getHash = (input: string): string => {
  return md5(input);
};
