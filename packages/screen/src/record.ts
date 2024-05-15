import { getHash } from "@imrobot/monitor-helpers";
import { EventType, record } from "rrweb";
import { Event, ScreenOptions } from "../types";
import { compress, monitor } from "./helpers";

export const onScreen = (options?: ScreenOptions) => {
  const reportNum = options?.reportNum || 1;

  console.log("test");

  const events: Event[] = [];

  record({
    async emit(event) {
      if (event.type === EventType.FullSnapshot) {
        const hash = getHash(JSON.stringify(event.data));
        const response = await fetch(`${monitor.baseURL}/hash?md5=${hash}`, {
          method: "get",
        });
        const hasFull = await response.json();

        if (!hasFull) {
          monitor.reportData("/hash", {
            md5: hash,
            data: compress(JSON.stringify(event.data)),
            timestamp: event.timestamp,
          });
        }
        events.push({
          type: event.type,
          data: hash,
          timestamp: event.timestamp,
        });
      } else {
        events.push({
          type: event.type,
          data: compress(JSON.stringify(event.data)),
          timestamp: event.timestamp,
        });
      }
      if (events.length >= reportNum) {
        monitor.reportData("/events", {
          events: [...events],
        });
        events.length = 0;
      }
    },
  });
};
