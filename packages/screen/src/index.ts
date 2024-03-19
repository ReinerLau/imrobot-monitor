import { ScreenOptions } from "./types";
import { onScreen } from "./record";
export * from "./play";

const plugin = {
  install(options?: ScreenOptions) {
    onScreen(options);
  },
};

export default plugin;
