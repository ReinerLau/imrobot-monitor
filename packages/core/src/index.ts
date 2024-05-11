import { Monitor } from "../types";
import { install } from "./install";
import { use } from "./use";

const monitor: Monitor = {
  install,
  use,
};

export default monitor;
