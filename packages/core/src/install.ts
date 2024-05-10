import {
  getTimestamp,
  global,
  Monitor,
  reportData,
} from "@imrobot/monitor-helpers";
import { io } from "socket.io-client";
import type { App } from "vue";
import {
  handleError,
  handleHTTPRequest,
  handleResourceError,
  handleUnhandleRejection,
} from "./handleEvents";
import { EventTypes } from "./helpers";
import {
  extensionInstallEvents,
  notifyAfterErrorEvent,
  subscribeEvent,
} from "./subscribe";
import type { InstallOptions, ResourceErrorTarget, XHRData } from "./types";

export const install = (app: App, options: InstallOptions): void => {
  const monitor = new Monitor(options.baseURL);
  setupOptions(options);
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
  extensionTrigger(monitor);
  connectWS();
};

let startTime: number = getTimestamp();

function connectWS() {
  const socket = io(global.baseURL);
  socket.on("report", onReport);
  window.addEventListener("blur", () => {
    socket.close();
  });
  window.addEventListener("focus", () => {
    socket.connect();
  });
}

function setupOptions(options: InstallOptions) {
  global.baseURL = options.baseURL || global.baseURL;
}

function onReport() {
  const time = getTimestamp();
  reportData("/api", { time, startTime });
  startTime = time;
  notifyAfterErrorEvent(time);
}

function extensionTrigger(monitor: Monitor) {
  extensionInstallEvents.forEach((event) => event(monitor));
}
