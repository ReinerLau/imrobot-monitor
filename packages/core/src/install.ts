import type { App } from "vue";
import { handleError, handleResourceError } from "./handleEvents";
import type { ResourceErrorTarget } from "./types";

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App) => {
  app.config.errorHandler = (err) => {
    handleError(err as Error);
  };
  window.addEventListener(
    "error",
    (err) => {
      const target = err.target as ResourceErrorTarget;
      if (target?.localName) {
        handleResourceError(target);
      } else {
        handleError(err.error);
      }
    },
    true
  );
};
