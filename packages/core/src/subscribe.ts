import { App } from "vue";
import { eventTypes } from "./shared";
import { xhrReplace } from "./replace";
import { global } from "@imrobot/shared";

/**
 * 所有错误事件集合
 */
const events: { [key in eventTypes]?: Function } = {};

/**
 * 开始监听对应错误事件的集合
 */
const on: { [key in eventTypes]?: Function } = {
  [eventTypes.VUEERROR]: (app: App) => onVueError(app),
  [eventTypes.ERROR]: () => onError(),
  [eventTypes.UNHANDLEDREJECTION]: () => onPromiseError(),
  [eventTypes.XHR]: () => xhrReplace(),
};

/**
 * 订阅事件
 * @param eventType 事件类型
 * @param event 事件
 * @returns 是否订阅成功
 */
export const subscribeEvent = (
  eventType: eventTypes,
  event: Function,
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
export const notify = (eventType: eventTypes, ...args: any[]) => {
  global.hasError = true;
  const event = events[eventType];
  if (event) {
    const errorData = event(...args);
    notifyAfterErrorEvent(errorData);
  }
};

/**
 * 监听 vue 代码运行错误
 * @param app vue 实例
 */
const onVueError = (app: App) => {
  app.config.errorHandler = (err) => {
    notify(eventTypes.VUEERROR, err);
  };
};

/**
 * 监听加载资源错误和异步错误
 */
const onError = () => {
  window.addEventListener(
    eventTypes.ERROR,
    (ev) => notify(eventTypes.ERROR, ev),
    true
  );
};

/**
 * 监听 Promise 错误
 */
const onPromiseError = () => {
  window.addEventListener(eventTypes.UNHANDLEDREJECTION, (ev) =>
    notify(eventTypes.UNHANDLEDREJECTION, ev)
  );
};

const afterErrorEvents: Function[] = [];

export const subscribeAfterErrorEvent = (event: Function) => {
  afterErrorEvents.push(event);
};

export const notifyAfterErrorEvent = (errorData: any) => {
  afterErrorEvents.forEach((event) => {
    // 变成宏任务, 防止在其他插件事件之前执行
    setTimeout(() => {
      event(errorData);
    }, 0);
  });
};
