import { ErrorTypes, EventTypes, global } from "@imrobot/shared";
import { App } from "vue";
import { xhrReplace } from "./replace";
import { AfterErrorEvent } from "./types";

/**
 * 所有错误事件集合
 */
const events: { [key in EventTypes]?: AfterErrorEvent } = {};

/**
 * 开始监听对应错误事件的集合
 */
const on: { [key in EventTypes]?: Function } = {
  [EventTypes.VUE]: (app: App) => onVueError(app),
  [EventTypes.ERROR]: () => onError(),
  [EventTypes.UNHANDLEDREJECTION]: () => onPromiseError(),
  [EventTypes.XHR]: () => xhrReplace(),
};

/**
 * 订阅事件
 * @param eventType 事件类型
 * @param event 事件
 * @returns 是否订阅成功
 */
export const subscribeEvent = (
  eventType: EventTypes,
  event: AfterErrorEvent,
  vueInstance?: App
) => {
  if (eventType in events) return false;
  events[eventType] = event;
  const onEvent = on[eventType];
  if (vueInstance) {
    onEvent && onEvent(vueInstance);
  } else {
    onEvent && onEvent();
  }
  return true;
};

/**
 * 通知事件触发
 * @param eventType 事件类型
 */
export const notify = (eventType: EventTypes, ...args: any[]) => {
  global.hasError = true;
  const event = events[eventType];
  if (event) {
    const ErrorType = event(...args);
    notifyAfterErrorEvent(ErrorType);
  }
};

/**
 * 监听 vue 代码运行错误
 * @param app vue 实例
 */
const onVueError = (app: App) => {
  app.config.errorHandler = (err) => {
    notify(EventTypes.VUE, err);
  };
};

/**
 * 监听加载资源错误和异步错误
 */
const onError = () => {
  window.addEventListener(
    EventTypes.ERROR,
    (ev) => notify(EventTypes.ERROR, ev),
    true
  );
};

/**
 * 监听 Promise 错误
 */
const onPromiseError = () => {
  window.addEventListener(EventTypes.UNHANDLEDREJECTION, (ev) =>
    notify(EventTypes.UNHANDLEDREJECTION, ev)
  );
};

const afterErrorEvents: Function[] = [];

export const subscribeAfterErrorEvent = (event: Function) => {
  afterErrorEvents.push(event);
};

export const notifyAfterErrorEvent = (errorType: ErrorTypes) => {
  afterErrorEvents.forEach((event) => {
    // 变成宏任务, 防止在其他插件事件之前执行
    setTimeout(() => {
      event(errorType);
    }, 0);
  });
};
