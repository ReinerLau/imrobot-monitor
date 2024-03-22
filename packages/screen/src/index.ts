import { ScreenOptions } from "./types";
import { onScreen } from "./record";
import { Extension } from "@imrobot/shared";
export * from "./play";

const extension: Extension = {
  install(options?: ScreenOptions) {
    onScreen(options);
  },
  afterEvent(data: any) {
    console.log(data);
  },
};

export default extension;
