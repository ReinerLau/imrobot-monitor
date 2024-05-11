import { getTimestamp, Monitor } from "@imrobot/monitor-helpers";
import { Behavior } from "../types";

export let monitor: Monitor;
export let maxStackNum: number;
export const behaviorStack: Behavior[] = [];

export enum BEHAVIORTYPES {
  CLICK = "click",
  NAVIGATION = "navigation",
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
    const time = getTimestamp();
    const data = { time, data: { ...behaviorStack } };
    monitor.reportData("/behavior", data);
    behaviorStack.length = 0;
  }
};
