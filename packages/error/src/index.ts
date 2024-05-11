import { Monitor } from "@imrobot/monitor-helpers";
import errorStackParser from "error-stack-parser";
import { InstallOptions } from "../types";
import { monitor, setupMonitor } from "./helpers";
import { getErrorUid, hasHash } from "./utils";

const extension = {
  install(monitor: Monitor, options: InstallOptions = { vue: true }) {
    setupMonitor(monitor);
    if (options.vue) {
      monitor.vueInstance.config.errorHandler = (err: any) => {
        handleError(err);
        // notify(EventTypes.VUE, err);
      };
    }
  },
};

const handleError = (err: Error) => {
  const { fileName, columnNumber, lineNumber } = errorStackParser.parse(err)[0];
  const errorData = {
    fileName: "",
    url: "",
    message: "",
    lineNumber: 0,
    columnNumber: 0,
    time: Date.now(),
    code: "{}",
  };
  const hash = getErrorUid(
    `${errorData.message}-${errorData.url}-${errorData.lineNumber}-${errorData.columnNumber}`
  );
  if (!hasHash(hash)) {
    monitor.reportData("/error/code", errorData);
  }
};

export default extension;
