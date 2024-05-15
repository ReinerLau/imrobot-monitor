import { extensionInstallEvent, Monitor } from "@imrobot/monitor-helpers";
import { ScreenOptions } from "../types/index";
import { setupMonitor } from "./helpers";
import { onScreen } from "./record";

export const install: extensionInstallEvent = (
  monitor: Monitor,
  options?: ScreenOptions
) => {
  setupMonitor(monitor);
  onScreen(options);
};
