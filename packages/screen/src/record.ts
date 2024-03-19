import { record } from "rrweb";
import { ScreenOptions } from "./types";

export const events: any[] = [];

export const onScreen = (options?: ScreenOptions) => {
  record({
    async emit(event, isCheckout) {
      if (isCheckout) {
        console.log("test1");
        fetch("/reportEvent", {
          method: "POST",
          body: JSON.stringify(events),
          headers: {
            "Content-Type": "application/json",
          },
        });
        events.length = 0;
      }
      events.push(event);
    },
    checkoutEveryNth: options?.checkoutEveryNth,
  });
};
