import { Monitor } from "@imrobot/monitor-helpers";

export let monitor: Monitor;

export const setupMonitor = (instance: Monitor) => {
  monitor = instance;
};
