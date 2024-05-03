import { Extension } from "@imrobot/monitor-helpers";
import { App } from "vue";

export interface ResourceErrorTarget {
  src?: string;
  localName?: string;
  href?: string;
}

export interface XHRInstance extends XMLHttpRequest {
  data: XHRData;
}

export interface XHRData {
  method: string;
  url: string;
  requestData?: string;
  response?: string;
  status?: number;
  sendTime: number;
  elapsedTime?: number;
}

export type Use = <T extends Extension>(
  extension: T,
  options?: Parameters<T["install"]>[0]
) => void;

export type Monitor = {
  use: Use;
  install: (app: App, options?: InstallOptions) => void;
};

export type AfterErrorEvent = (...args: any[]) => void;

export interface InstallOptions {
  baseURL?: string;
}
