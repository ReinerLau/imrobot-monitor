import { Extension, getTimestamp, reportData } from "@imrobot/monitor-helpers";
import { Behavior, BehaviorOptions } from "../types";
import { onNavigation } from "./navigation";
import {
  behaviorStack,
  BEHAVIORTYPES,
  pushBehaviorStack,
  setMaxStackNum,
} from "./shared";

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

const install = (options?: BehaviorOptions) => {
  setMaxStackNum(options?.maxStackNum);
  onClick();
  onNavigation();
};

const afterEvent = (time: number) => {
  if (behaviorStack.length > 0) {
    const data = { time, data: behaviorStack };
    reportData("/behavior", data);
    behaviorStack.length = 0;
  }
};

const extension: Extension = {
  install,
  afterEvent,
};

export default extension;
