import { Extension } from "@imrobot/shared";
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

export type Use = <T extends Extension>(
  extension: T,
  options?: Parameters<T["install"]>[0]
) => void;

export type Monitor = {
  use: Use;
} & Plugin;
