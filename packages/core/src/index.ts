import { install, use } from "./install";
import { Monitor } from "./types";
export { default as behavior } from "@imrobot/behavior";
export { playScreen, default as screen } from "@imrobot/screen";

const monitor: Monitor = {
  install,
  use,
};

export default monitor;
