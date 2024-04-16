import {
  BEHAVIORTYPES,
  Extension,
  getTimestamp,
  reportData,
} from "@imrobot/shared";
import { ErrorTypes } from "../../shared/types/index";
import { Behavior, BehaviorOptions } from "../types";
import { onNavigation } from "./navigation";
import { behaviorStack, pushBehaviorStack, setMaxStackNum } from "./shared";

const onClick = () => {
  document.addEventListener("click", (ev: any) => {
    const htmlString = elementToString(ev.target);
    const data: Behavior = {
      type: BEHAVIORTYPES.CLICK,
      content: htmlString,
      time: getTimestamp(),
    };
    pushBehaviorStack(data);
  });
};

const elementToString = (target: HTMLElement) => {
  const tagName = target.tagName.toLowerCase();
  const innerText = target.innerText;
  return `<${tagName}>${innerText}</${tagName}>`;
};

const extension: Extension = {
  install(options?: BehaviorOptions) {
    setMaxStackNum(options?.maxStackNum);
    onClick();
    onNavigation();
  },
  afterEvent(errorType: ErrorTypes) {
    reportData("/behavior", { errorType, data: behaviorStack });
  },
};

export default extension;
