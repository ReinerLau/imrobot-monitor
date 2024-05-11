import { getTimestamp } from "@imrobot/monitor-helpers";
import { Behavior } from "../types";
import { BEHAVIORTYPES, pushBehaviorStack } from "./helpers";

export const onClick = () => {
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