import { extensionInstallEvents, subscribeAfterErrorEvent } from "./subscribe";
import { Use } from "./types";

export const use: Use = (extension, options) => {
  extensionInstallEvents.push(() => extension.install(options));
  extension.afterEvent && subscribeAfterErrorEvent(extension.afterEvent);
};
