import { ErrorTypes, Extension } from "@imrobot/shared";
import { openHasError, setErrorType } from "./helpers";
import { onScreen } from "./record";
import { ScreenOptions } from "./types";
export * from "./play";

const extension: Extension = {
  install(options?: ScreenOptions) {
    onScreen(options);
  },
  afterEvent(errorType: ErrorTypes) {
    openHasError();
    setErrorType(errorType);
  },
};

export default extension;
