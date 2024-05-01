import { install } from "./install";
import { Monitor } from "./types";
import { use } from "./use";

const monitor: Monitor = {
  install,
  use,
};

export default monitor;
