import { Monitor } from "./monitor";
import { extensionInstallEvents, subscribeAfterErrorEvent } from "./subscribe";
import { Use } from "./types";

export const use: Use = (extension, options) => {
  extensionInstallEvents.push((monitor: Monitor) => {
    const mergedOptions = { monitor, options };
    extension.install(mergedOptions);
  });
  extension.afterEvent && subscribeAfterErrorEvent(extension.afterEvent);
};
