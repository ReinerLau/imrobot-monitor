import type { App } from "vue";
import { handleError, handleResourceError } from "./handleEvents";

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
      handleResourceError(err);
    },
    true
  );
};
