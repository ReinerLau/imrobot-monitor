import { Monitor } from "@imrobot/monitor-helpers";
import { InstallOptions } from "../types/index";

const extension = {
  install(monitor: Monitor, options: InstallOptions) {
    console.log(options);
    monitor.reportData();
  },
};

export default extension;
