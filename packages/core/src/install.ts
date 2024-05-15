import { InstallOptions, Monitor } from "@imrobot/monitor-helpers";
import { extensionInstallEvents } from "./subscribe";

export const install = (app: any, options: InstallOptions): void => {
  const monitor = new Monitor(app, options);
  extensionTrigger(monitor);
};

function extensionTrigger(monitor: Monitor) {
  extensionInstallEvents.forEach((event) => event(monitor));
}
