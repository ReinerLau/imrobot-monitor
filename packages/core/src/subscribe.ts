import { App } from "vue";
import { eventTypes } from "./shared";

/**
 * 出现错误
 */
export let hasError = false;

/**
 * 所有错误事件集合
 */
const events: { [key in eventTypes]?: Function } = {};

const on: { [key in eventTypes]?: Function } = {
  [eventTypes.VUEERROR]: (app: App) => onVueError(app),
  [eventTypes.ERROR]: () => onError(),
  [eventTypes.UNHANDLEDREJECTION]: () => onPromiseError(),
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
  hasError = true;
  const event = events[eventType];
  event && event(...args);
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
const onPromiseError = (): void => {
  window.addEventListener(eventTypes.UNHANDLEDREJECTION, (ev) =>
    notify(eventTypes.UNHANDLEDREJECTION, ev)
  );
};
