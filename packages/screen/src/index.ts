import { Extension } from "@imrobot/monitor-helpers";
import { install } from "./install";
export * from "./play";

const extension: Extension = {
  install,
};

export default extension;
