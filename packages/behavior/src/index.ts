import {
  BEHAVIORTYPES,
  ErrorEventTypes,
  Extension,
  getTimestamp,
  NormalEventTypes,
} from "@imrobot/shared";
import { Behavior, BehaviorOptions } from "../types";
import { onNavigation } from "./navigation";
import { behaviorStack, pushBehaviorStack, setMaxStackNum } from "./shared";

/**
 * 监听点击行为
 */
const onClick = () => {
  document.addEventListener("click", (ev: any) => {
    const htmlString = elementToString(ev.target);
    const data = {
      type: BEHAVIORTYPES.CLICK,
      data: htmlString,
      time: getTimestamp(),
    };
    pushBehaviorStack(data);

    fetch("/reportBehavior", {
      method: "POST",
      body: JSON.stringify(behaviorStack),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

/**
 * 元素转字符串
 * @param target 元素对象
 * @returns 标签字符串
 */
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
  afterEvent(errorData: any) {
    const data: Behavior = {
      type: errorData.type,
      data: errorData.message,
      time: errorData.time,
    };
    if ([ErrorEventTypes.XHR, NormalEventTypes.XHR].includes(errorData.type)) {
      data.method = errorData.method;
      data.url = errorData.url;
      data.status = errorData.status;
    }
    pushBehaviorStack(data);

    fetch("/reportBehavior", {
      method: "POST",
      body: JSON.stringify(behaviorStack),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (Object.values(ErrorEventTypes).includes(errorData.type)) {
      console.log(behaviorStack);
    }
  },
};

export default extension;
