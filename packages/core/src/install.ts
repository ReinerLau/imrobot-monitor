import type { App } from "vue";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import type {
  extensionInstallEvent,
  ResourceErrorTarget,
  Use,
  XHRData,
} from "./types";
import { eventTypes } from "./shared";
import { subscribeEvent } from "./subscribe";

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App): void => {
  subscribeEvent(
    eventTypes.VUEERROR,
    (err: Error) => {
      handleError(err);
    },
    app
  );
  subscribeEvent(eventTypes.ERROR, (ev: ErrorEvent) => {
    const target = ev.target as ResourceErrorTarget;
    if (target?.localName) {
      handleResourceError(target);
    } else {
      handleError(ev.error);
    }
  });
  subscribeEvent(eventTypes.UNHANDLEDREJECTION, (ev: PromiseRejectionEvent) => {
    handleUnhandleRejection(ev);
  });
  subscribeEvent(eventTypes.XHR, (xhrData: XHRData) => {
    handleHTTPRequest(xhrData);
  });
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
export const use: Use = (extension, options) => {
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
