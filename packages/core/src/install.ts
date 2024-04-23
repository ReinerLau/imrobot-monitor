import { EventTypes, extensionInstallEvent } from "@imrobot/shared";
import { io } from "socket.io-client";
import type { App } from "vue";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import { Modes } from "./shared";
import { subscribeAfterErrorEvent, subscribeEvent } from "./subscribe";
import {
  type InstallOptions,
  type ResourceErrorTarget,
  type Use,
  type XHRData,
} from "./types";

export const install = (app: App, options: InstallOptions = {}): void => {
  subscribeEvent(
    EventTypes.VUE,
    (err: Error) => {
      return handleError(err);
    },
    app
  );
  subscribeEvent(EventTypes.ERROR, (ev: ErrorEvent) => {
    const target = ev.target as ResourceErrorTarget;
    if (target?.localName) {
      return handleResourceError(target);
    } else {
      return handleError(ev.error);
    }
  });
  subscribeEvent(EventTypes.UNHANDLEDREJECTION, (ev: PromiseRejectionEvent) => {
    return handleUnhandleRejection(ev);
  });
  subscribeEvent(EventTypes.XHR, (xhrData: XHRData) => {
    return handleHTTPRequest(xhrData);
  });
  if (options.mode === Modes.ANY) {
    test();
  }
  extensionTrigger();
};

function test() {
  const socket = io("http://localhost:3001");
  // socket.on("connect", () => {
  //   socket.emit("events", { id: "test1" }, (data: any) => console.log(data));
  // });
  socket.on("acknowledgement", (data) => {
    console.log(data);
  });
}

export const extensionInstallEvents: extensionInstallEvent[] = [];

export const use: Use = (extension, options) => {
  extensionInstallEvents.push(() => extension.install(options));
  extension.afterEvent && subscribeAfterErrorEvent(extension.afterEvent);
};

const extensionTrigger = () => {
  extensionInstallEvents.forEach((event) => {
    event();
  });
};
