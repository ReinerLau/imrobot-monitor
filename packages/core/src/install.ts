import type { App } from "vue";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import type { ResourceErrorTarget, Use, XHRData } from "./types";
import { subscribeAfterErrorEvent, subscribeEvent } from "./subscribe";
import { EventTypes, extensionInstallEvent } from "@imrobot/shared";

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App): void => {
  subscribeEvent(
    EventTypes.VUE,
    (err: Error) => {
      return handleError(err);
    },
    app
  );
  subscribeEvent(EventTypes.ERROR, (ev: ErrorEvent) => {
    const target = ev.target as ResourceErrorTarget;
    if (target?.localName) {
      return handleResourceError(target);
    } else {
      return handleError(ev.error);
    }
  });
  subscribeEvent(EventTypes.UNHANDLEDREJECTION, (ev: PromiseRejectionEvent) => {
    return handleUnhandleRejection(ev);
  });
  subscribeEvent(EventTypes.XHR, (xhrData: XHRData) => {
    return handleHTTPRequest(xhrData);
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
  extension.afterEvent && subscribeAfterErrorEvent(extension.afterEvent);
};

/**
 * 触发拓展初始化方法
 */
const extensionTrigger = () => {
  extensionInstallEvents.forEach((event) => {
    event();
  });
};
