import { events } from "./record";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

export const play = (el: HTMLElement) => {
  new rrwebPlayer({
    target: el,
    props: {
      events,
    },
  });
};

export const playTest = (el: HTMLElement, events: any[]) => {
  new rrwebPlayer({
    target: el,
    props: {
      events,
    },
  });
};
