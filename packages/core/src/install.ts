import { EventTypes, extensionInstallEvent, reportData } from "@imrobot/shared";
import { io, Socket } from "socket.io-client";
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
import { type ResourceErrorTarget, type Use, type XHRData } from "./types";

export const install = (app: App): void => {
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
  extensionTrigger();
  connectWS();
};

let socket: Socket;

function connectWS() {
  window.addEventListener("blur", () => {
    socket.close();
  });
  window.addEventListener("focus", () => {
    if (!socket) {
      socket = io("http://localhost:3001");
      socket.on("report", onReport);
    }
    socket.connect();
  });
}

function onReport() {
  const time = Date.now();
  reportData("/api", { time });
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
