import { EventTypes, getTimestamp } from "@imrobot/monitor-helpers";
import { notify } from "./subscribe";
import { XHRInstance } from "./types";

/**
 * 重写 xmlhttprequset 原型方法
 */
export const xhrReplace = () => {
  xhrOpenReplace();
  xhrSendReplace();
};

/**
 * 重写 xmlhttprequest open 方法
 */
const xhrOpenReplace = () => {
  const originalXHRProto = XMLHttpRequest.prototype;
  const originalOpen = originalXHRProto.open;
  originalXHRProto.open = function (...args: [string, string]) {
    const instance: XHRInstance = this;
    instance.data = {
      method: args[0],
      url: args[1],
      sendTime: getTimestamp(),
    };
    originalOpen.apply(instance, args);
  };
};

/**
 * 重写 xmlhttprequest send 方法
 */
const xhrSendReplace = () => {
  const originalXHRProto = XMLHttpRequest.prototype;
  const originalSend = originalXHRProto.send;
  originalXHRProto.send = function (...args: any[]) {
    const instance: XHRInstance = this;
    instance.data.requestData = args[0];
    instance.addEventListener("loadend", () => {
      const { responseType, response, status } = instance;
      if (["", "json", "text"].includes(responseType)) {
        instance.data.response = response;
        instance.data.status = status;
        instance.data.elapsedTime =
          new Date(getTimestamp()).getTime() -
          new Date(instance.data.sendTime).getTime();
      }
      notify(EventTypes.XHR, instance.data);
    });
    originalSend.apply(instance, args);
  };
};
