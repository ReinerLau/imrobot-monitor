import type { App } from "vue";
import { handleError } from "./handleEvents";

/**
 * 插件安装方法
 * @param app vue 实例
 */
export const install = (app: App) => {
  app.config.errorHandler = (err, instance, info) => {
    handleError(err as Error);
  };
};
