import { Monitor } from "@imrobot/monitor-helpers";
import { Use } from "../types";
import { extensionInstallEvents } from "./subscribe";

export const use: Use = (extension, options) => {
  extensionInstallEvents.push((monitor: Monitor) => {
    extension.install(monitor, options);
  });
};
