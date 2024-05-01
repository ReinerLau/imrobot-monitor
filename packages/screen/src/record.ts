import { reportData } from "@imrobot/monitor-helpers";
import { Base64 } from "js-base64";
import pako from "pako";
import { record } from "rrweb";

export const events: any[] = [];

export const onScreen = () => {
  record({
    emit(event) {
      events.push(event);
    },
  });
};

export const install = () => {
  onScreen();
};

export const afterEvent = (time: number) => {
  const data = { time, data: zip(events) };
  reportData("/screen", data);
  events.length = 0;
  record.takeFullSnapshot(true);
};

export function zip(data: any[]): string {
  if (!data) return data;
  const base64Str = Base64.encode(JSON.stringify(data));
  const zipData = pako.gzip(base64Str);
  const zipDataArray = Array.from(zipData);
  let result = "";
  zipDataArray.forEach((item: any) => {
    result += String.fromCharCode(item);
  });
  return Base64.btoa(result);
}
