export interface InstallOptions {
  vue: boolean;
  error: boolean;
  promise: boolean;
  xhr: boolean;
}

export type AfterErrorEvent = (...args: any[]) => void;

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

export interface ResourceErrorTarget {
  src?: string;
  localName?: string;
  href?: string;
}
