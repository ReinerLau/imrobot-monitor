import { Monitor } from "@imrobot/monitor-helpers";
import { InstallOptions, ResourceErrorTarget, XHRData } from "../types";
import { setupMonitor } from "./helpers";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./helpers/handlers";
import { EventTypes, subscribeEvent } from "./helpers/subscribe";

const extension = {
  install(
    monitor: Monitor,
    options: InstallOptions = {
      vue: true,
      error: true,
      promise: true,
      xhr: true,
    }
  ) {
    setupMonitor(monitor);

    if (options.vue) {
      subscribeEvent(EventTypes.VUE, (err: Error) => {
        handleError(err);
      });
    }

    if (options.error) {
      subscribeEvent(EventTypes.ERROR, (ev: ErrorEvent) => {
        const target = ev.target as ResourceErrorTarget;
        if (target?.localName) {
          handleResourceError(target);
        } else {
          handleError(ev.error);
        }
      });
    }

    if (options.promise) {
      subscribeEvent(
        EventTypes.UNHANDLEDREJECTION,
        (ev: PromiseRejectionEvent) => {
          handleUnhandleRejection(ev);
        }
      );
    }

    if (options.xhr) {
      subscribeEvent(EventTypes.XHR, (xhrData: XHRData) => {
        handleHTTPRequest(xhrData);
      });
    }
  },
};

export default extension;
