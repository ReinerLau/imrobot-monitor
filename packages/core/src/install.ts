import type { App } from "vue";
import {
  handleError,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import type {
  Extension,
  PluginInstallEvent as extensionInstallEvent,
  ResourceErrorTarget,
} from "./types";
import { eventTypes } from "./shared";
import { xhrReplace } from "./replace";
import plugin from "../../screen/src/index";

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

const onXHRError = () => {
  xhrReplace();
};

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App): void => {
  onVueError(app);
  onError();
  onPromiseError();
  onXHRError();
  extensionTrigger();
};

/**
 * 已注册拓展集合
 */
export const extensionInstallEvents: extensionInstallEvent[] = [];

/**
 * 注册拓展
 * @param extension 拓展实例
 */
export const use = (extension: Extension, options?: any) => {
  extensionInstallEvents.push(() => extension.install(options));
};

/**
 * 触发拓展初始化方法
 */
const extensionTrigger = () => {
  extensionInstallEvents.forEach((event) => {
    event();
  });
};
