import rrwebPlayer from "rrweb-player";
/**
 * https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/#installation
 */
import "rrweb-player/dist/style.css";
import { decompress } from "./helpers";

export const playScreen = (el: HTMLElement, data: any[], width?: number) => {
  const events = data.map((item) => ({
    ...item,
    data: decompress(item.data),
  }));

  new rrwebPlayer({
    target: el,
    props: {
      events,
      width,
    },
  });
};
