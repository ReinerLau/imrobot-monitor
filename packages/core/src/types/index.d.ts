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
