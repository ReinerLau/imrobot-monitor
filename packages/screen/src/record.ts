import { getHash } from "@imrobot/monitor-helpers";
import { EventType, IncrementalSource, record } from "rrweb";
import { Event, ScreenOptions } from "../types";
import { compress, monitor } from "./helpers";

export const onScreen = (options?: ScreenOptions) => {
  const reportNum = options?.reportNum || 1;

  const events: Event[] = [];

  record({
    async emit(event) {
      if (
        event.type === EventType.IncrementalSnapshot &&
        event.data.source === IncrementalSource.Mutation
      ) {
        const imgs = event.data.adds.filter(
          (add) => (add.node as any).tagName === "img"
        );
        imgs.forEach((img) => {
          (img.node as any).attributes.src = (
            img.node as any
          ).attributes.src.replace(/http:\/\/[^\/]+/, monitor.appId);
        });
      }
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
