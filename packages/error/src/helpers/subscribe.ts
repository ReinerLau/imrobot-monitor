import { getTimestamp } from "@imrobot/monitor-helpers";
import { monitor } from ".";
import { AfterErrorEvent, XHRInstance } from "../../types";

export enum EventTypes {
  VUE = "vue",
  ERROR = "error",
  RESOURCE = "resource",
  UNHANDLEDREJECTION = "unhandledrejection",
  XHR = "xhr",
}

const events: { [key in EventTypes]?: AfterErrorEvent } = {};

const on: { [key in EventTypes]?: Function } = {
  [EventTypes.VUE]: () => onVueError(),
  [EventTypes.ERROR]: () => onError(),
  [EventTypes.UNHANDLEDREJECTION]: () => onPromiseError(),
  [EventTypes.XHR]: () => xhrReplace(),
};

export const subscribeEvent = (
  eventType: EventTypes,
  event: AfterErrorEvent
) => {
  // 订阅事件
  if (eventType in events) return false;
  events[eventType] = event;
  // 监听事件
  const onEvent = on[eventType];
  onEvent && onEvent();
  return true;
};

export const notify = (eventType: EventTypes, ...args: any[]) => {
  const event = events[eventType];
  if (event) {
    event(...args);
  }
};

const onVueError = () => {
  monitor.vueInstance.config.errorHandler = (err) => {
    notify(EventTypes.VUE, err);
  };
};

const onError = () => {
  window.addEventListener(
    EventTypes.ERROR,
    (ev) => notify(EventTypes.ERROR, ev),
    true
  );
};

const onPromiseError = () => {
  window.addEventListener(EventTypes.UNHANDLEDREJECTION, (ev) =>
    notify(EventTypes.UNHANDLEDREJECTION, ev)
  );
};

export const xhrReplace = () => {
  xhrOpenReplace();
  xhrSendReplace();
};

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
