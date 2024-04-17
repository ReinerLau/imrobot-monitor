import { reportData } from "@imrobot/shared";
import { record } from "rrweb";
import { closeHasError, errorType, hasError } from "./helpers";
import { ScreenOptions } from "./types";

export const events: any[] = [];

export const onScreen = (options?: ScreenOptions) => {
  record({
    async emit(event, isCheckout) {
      if (isCheckout) {
        if (hasError) {
          reportData("/screen", { errorType, data: events });
          closeHasError();
        }
        events.length = 0;
      }
      events.push(event);
    },
    checkoutEveryNth: options?.checkoutEveryNth,
    checkoutEveryNms: options?.checkoutEveryNms,
  });
};
