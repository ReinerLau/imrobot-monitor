import { Monitor } from "@imrobot/monitor-helpers";
import { extensionInstallEvents, subscribeAfterErrorEvent } from "./subscribe";
import { Use } from "./types";

export const use: Use = (extension, options) => {
  extensionInstallEvents.push((monitor: Monitor) => {
    extension.install(monitor, options);
  });
  extension.afterEvent && subscribeAfterErrorEvent(extension.afterEvent);
};
