import type { App } from "vue";
import {
  handleError,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import type { ResourceErrorTarget } from "./types";
import { eventTypes } from "./shared";

/**
 * 监听 vue 代码运行错误
 * @param app vue 实例
 */
const onVueError = (app: App) => {
  app.config.errorHandler = (err) => {
    handleError(err as Error);
  };
};

/**
 * 监听加载资源错误和异步错误
 */
const onError = (): void => {
  window.addEventListener(
    eventTypes.ERROR,
    (ev) => {
      const target = ev.target as ResourceErrorTarget;
      if (target?.localName) {
        handleResourceError(target);
      } else {
        handleError(ev.error);
      }
    },
    true
  );
};

/**
 * 监听 Promise 错误
 */
const onPromiseError = (): void => {
  window.addEventListener(eventTypes.UNHANDLEDREJECTION, (ev) => {
    handleUnhandleRejection(ev);
  });
};

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App): void => {
  onVueError(app);
  onError();
  onPromiseError();
};
