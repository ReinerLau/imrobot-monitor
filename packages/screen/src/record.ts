import { getHash, getTimestamp } from "@imrobot/monitor-helpers";
import { EventType, record } from "rrweb";
import { ScreenOptions } from "../types/index";
import { compress, monitor } from "./helpers";

const events: any[] = [];

let hash = "";

export const onScreen = (options: ScreenOptions) => {
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        const time = getTimestamp();
        const data = { time, data: compress(JSON.stringify(events)), hash };
        events.length = 0;
        monitor.reportData("/screen", data);
      }
      if (event.type === EventType.FullSnapshot) {
        const newEvent = { ...event, timestamp: null };
        const newHash = getHash(JSON.stringify(newEvent));
        if (hash !== newHash) {
          hash = newHash;
          // TODO: 校验 hash
          // TODO: 上传压缩后的数据和 hash
        }
      } else {
        events.push(event);
      }
    },
    ...options,
  });
};
