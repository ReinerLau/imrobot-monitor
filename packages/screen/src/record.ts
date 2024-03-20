import { record } from "rrweb";
import { ScreenOptions } from "./types";
import { global } from "@imrobot/shared";

export const events: any[] = [];

export const onScreen = (options?: ScreenOptions) => {
  record({
    async emit(event, isCheckout) {
      if (isCheckout) {
        if (global.hasError) {
          fetch("/reportEvent", {
            method: "POST",
            body: JSON.stringify(events),
            headers: {
              "Content-Type": "application/json",
            },
          });
          global.hasError = false;
        }
        events.length = 0;
      }
      events.push(event);
    },
    checkoutEveryNth: options?.checkoutEveryNth,
    checkoutEveryNms: options?.checkoutEveryNms,
  });
};
