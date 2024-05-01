import { install } from "./install";
import { Monitor } from "./types";
import { use } from "./use";
export { default as behavior } from "@imrobot/behavior";
export { playScreen, default as screen } from "@imrobot/monitor-screen";

const monitor: Monitor = {
  install,
  use,
};

export default monitor;
