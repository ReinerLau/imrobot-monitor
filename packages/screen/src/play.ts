import rrwebPlayer from "rrweb-player";
/**
 * https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/#installation
 */
import "rrweb-player/dist/style.css";
import { decompress } from "./helpers";

export const playScreen = (
  el: HTMLElement,
  data: { full: string; increment: string },
  width?: number
) => {
  const full = decompress(data.full);

  const increment = decompress(data.increment);
  full.timestamp = increment[0].timestamp;
  const events = [full, ...increment];

  new rrwebPlayer({
    target: el,
    props: {
      events,
      width,
    },
  });
};
