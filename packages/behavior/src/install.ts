import { extensionInstallEvent } from "@imrobot/monitor-helpers";
import { BehaviorOptions } from "../types";
import { onClick } from "./click";
import { setMaxStackNum, setupMonitor } from "./helpers";
import { onNavigation } from "./navigation";

export const install: extensionInstallEvent = (
  monitor,
  options?: BehaviorOptions
) => {
  setupMonitor(monitor);
  setMaxStackNum(options?.maxStackNum);
  onClick();
  onNavigation();
};
