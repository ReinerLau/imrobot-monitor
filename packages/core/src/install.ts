import {
  EventTypes,
  extensionInstallEvent,
  getTimestamp,
  reportData,
} from "@imrobot/shared";
import { io } from "socket.io-client";
import type { App } from "vue";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import {
  notifyAfterErrorEvent,
  subscribeAfterErrorEvent,
  subscribeEvent,
} from "./subscribe";
import type {
  InstallOptions,
  ResourceErrorTarget,
  Use,
  XHRData,
} from "./types";

export const install = (app: App, options: InstallOptions): void => {
  subscribeEvent(
    EventTypes.VUE,
    (err: Error) => {
      handleError(err);
    },
    app
  );
  subscribeEvent(EventTypes.ERROR, (ev: ErrorEvent) => {
    const target = ev.target as ResourceErrorTarget;
    if (target?.localName) {
      handleResourceError(target);
    } else {
      handleError(ev.error);
    }
  });
  subscribeEvent(EventTypes.UNHANDLEDREJECTION, (ev: PromiseRejectionEvent) => {
    handleUnhandleRejection(ev);
  });
  subscribeEvent(EventTypes.XHR, (xhrData: XHRData) => {
    handleHTTPRequest(xhrData);
  });
  extensionTrigger();
  connectWS(options.cronTime);
};

let startTime: number = getTimestamp();

function connectWS(cronTime?: string) {
  const socket = io("http://localhost:3001", {
    query: {
      cronTime,
    },
  });
  socket.on("report", onReport);
  window.addEventListener("blur", () => {
    socket.close();
  });
  window.addEventListener("focus", () => {
    socket.connect();
  });
}

function onReport() {
  const time = getTimestamp();
  reportData("/api", { time, startTime });
  startTime = time;
  notifyAfterErrorEvent(time);
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
