import rrwebPlayer from "rrweb-player";
/**
 * https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/#installation
 */
import "rrweb-player/dist/style.css";

/**
 * 播放录屏
 * @param el 要插入视频控件的元素
 * @param events rrweb 生成的录屏数据
 */
export const playScreen = (el: HTMLElement, events: any[], width?: number) => {
  new rrwebPlayer({
    target: el,
    props: {
      events,
      width,
    },
  });
};
