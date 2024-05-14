import { getHash } from "@imrobot/monitor-helpers";
import { EventType, record } from "rrweb";
import { compress, monitor } from "./helpers";

export const onScreen = () => {
  record({
    async emit(event) {
      if (event.type === EventType.FullSnapshot) {
        const data = event.data;

        const hash = getHash(JSON.stringify(data));
        const response = await fetch(
          `${monitor.baseURL}/screen/hasFull/${hash}`,
          {
            method: "get",
          }
        );
        const hasFull = await response.json();

        if (hasFull) {
          monitor.reportData("/screen", {
            type: event.type,
            data: hash,
            timestamp: event.timestamp,
          });
        } else {
          monitor.reportData("/screen", {
            type: event.type,
            hash,
            data: compress(JSON.stringify(data)),
            timestamp: event.timestamp,
          });
        }
      } else {
        monitor.reportData("/screen", {
          type: event.type,
          data: compress(JSON.stringify(event.data)),
          timestamp: event.timestamp,
        });
      }
    },
  });
};
