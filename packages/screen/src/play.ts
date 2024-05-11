import { Base64 } from "js-base64";
import pako from "pako";
import rrwebPlayer from "rrweb-player";
/**
 * https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/#installation
 */
import "rrweb-player/dist/style.css";

export const playScreen = (
  el: HTMLElement,
  b64Data: string,
  width?: number
) => {
  const events = unzip(b64Data);
  new rrwebPlayer({
    target: el,
    props: {
      events,
      width,
    },
  });
};

function unzip(b64Data: string) {
  let strData = Base64.atob(b64Data);
  let charData = strData.split("").map(function (x) {
    return x.charCodeAt(0);
  });
  let binData = new Uint8Array(charData);
  let data = pako.ungzip(binData);
  // ↓切片处理数据，防止内存溢出报错↓
  let str = "";
  const chunk = 8 * 1024;
  let i;
  for (i = 0; i < data.length / chunk; i++) {
    str += String.fromCharCode.apply(
      null,
      data.slice(i * chunk, (i + 1) * chunk)
    );
  }
  str += String.fromCharCode.apply(null, data.slice(i * chunk));
  // ↑切片处理数据，防止内存溢出报错↑
  const unzipStr = Base64.decode(str);
  return JSON.parse(unzipStr);
}
