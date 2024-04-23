import { Extension } from "@imrobot/shared";
import { afterEvent, install } from "./record";
export * from "./play";

const extension: Extension = {
  install,
  afterEvent,
};

export default extension;
