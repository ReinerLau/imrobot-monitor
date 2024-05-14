import { extensionInstallEvent, Monitor } from "@imrobot/monitor-helpers";
import { setupMonitor } from "./helpers";
import { onScreen } from "./record";

export const install: extensionInstallEvent = (monitor: Monitor) => {
  setupMonitor(monitor);
  onScreen();
};
