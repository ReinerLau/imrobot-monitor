import { record } from "rrweb";
import { ScreenOptions } from "./types";

export const events: any[] = [];

export const onScreen = (options?: ScreenOptions) => {
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        console.log("test");
        events.length = 0;
      }
      events.push(event);
    },
    checkoutEveryNth: options?.checkoutEveryNth,
  });
};
