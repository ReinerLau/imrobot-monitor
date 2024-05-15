import { Monitor } from "@imrobot/monitor-helpers";
import { Behavior } from "../types";

export let monitor: Monitor;
export let maxStackNum: number;
export const behaviorStack: Behavior[] = [];

export enum BEHAVIORTYPES {
  CLICK = 1,
  NAVIGATION = 2,
}

export const setupMonitor = (instance: Monitor) => {
  monitor = instance;
};

export const setMaxStackNum = (val?: number) => {
  maxStackNum = val || 20;
};

export const pushBehaviorStack = (data: Behavior) => {
  behaviorStack.push(data);
  if (behaviorStack.length > maxStackNum) {
    monitor.reportData("/action", { data: behaviorStack });
    behaviorStack.length = 0;
  }
};
