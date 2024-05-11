import { Monitor } from "@imrobot/monitor-helpers";

export let monitor: Monitor;

export function setupMonitor(instance: Monitor) {
  monitor = instance;
}
