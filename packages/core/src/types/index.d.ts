import { Plugin } from "vue";

export interface ResourceErrorTarget {
  src?: string;
  localName?: string;
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

export type Monitor = {
  use: (extension: Extension, options?: any) => void;
} & Plugin;

export type PluginInstallEvent = (options?: any) => void;

export interface Extension {
  install: PluginInstallEvent;
}
