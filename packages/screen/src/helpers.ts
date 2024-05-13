import { Monitor } from "@imrobot/monitor-helpers";
import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";

export let monitor: Monitor;

export const setupMonitor = (instance: Monitor) => {
  monitor = instance;
};

export const compress = (input: string) => {
  const buf = strToU8(input);
  const compressed = compressSync(buf);
  const array = Array.from(compressed);
  return JSON.stringify(array);
};

export const decompress = (input: string) => {
  const array = JSON.parse(input);
  const compressed = new Uint8Array(array);
  const decompressed = decompressSync(compressed);
  const str = strFromU8(decompressed);
  return JSON.parse(str);
};
