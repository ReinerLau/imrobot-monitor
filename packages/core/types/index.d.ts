import { Extension } from "@imrobot/monitor-helpers";
import { App } from "vue";

export type Use = <T extends Extension>(
  extension: T,
  options?: Parameters<T["install"]>[1]
) => void;

export type Monitor = {
  use: Use;
  install: (app: App, options?: InstallOptions) => void;
};
