import { Monitor } from "@imrobot/monitor-helpers";
import { InstallOptions } from "../types/index";

const extension = {
  install(monitor: Monitor, options: InstallOptions = { vue: true }) {
    if (options.vue) {
      const errorData = {
        fileName: "",
        url: "",
        message: "",
        lineNumber: 0,
        columnNumber: 0,
        time: Date.now(),
        code: "{}",
      };
      monitor.reportData("/error/code", errorData);
    }
  },
};

export default extension;
