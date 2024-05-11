import { Monitor } from "@imrobot/monitor-helpers";
import type { InstallOptions } from "../types";
import { extensionInstallEvents } from "./subscribe";

export const install = (app: any, options: InstallOptions): void => {
  const monitor = new Monitor(options.baseURL, app);
  extensionTrigger(monitor);
};

function extensionTrigger(monitor: Monitor) {
  extensionInstallEvents.forEach((event) => event(monitor));
}
