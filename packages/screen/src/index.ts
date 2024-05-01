import { Extension } from "@imrobot/monitor-helpers";
import { afterEvent, install } from "./record";
export * from "./play";

const extension: Extension = {
  install,
  afterEvent,
};

export default extension;
