import { getTimestamp } from "@imrobot/monitor-helpers";
import { Base64 } from "js-base64";
import pako from "pako";
import { record } from "rrweb";
import { ScreenOptions } from "../types/index";
import { monitor } from "./helpers";

const events: any[] = [];

export const onScreen = (options: ScreenOptions) => {
  record({
    emit(event, isCheckout) {
      console.log(event);
      events.push(event);
      if (isCheckout) {
        const time = getTimestamp();
        const data = { time, data: zip(events) };
        events.length = 0;
        monitor.reportData("/screen", data);
      }
    },
    ...options,
  });
};

function zip(data: any[]): string {
  const base64Str = Base64.encode(JSON.stringify(data));
  const zipData = pako.gzip(base64Str);
  const zipDataArray = Array.from(zipData);
  let result = "";
  zipDataArray.forEach((item: any) => {
    result += String.fromCharCode(item);
  });
  return Base64.btoa(result);
}
