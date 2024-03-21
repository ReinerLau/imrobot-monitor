import { BEHAVIORTYPES, getTimestamp } from "@imrobot/shared";
import { Behavior, BehaviorOptions } from "../types";

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
  });
};

/**
 * 新增行为
 * @param data 行为数据
 */
const pushBehaviorStack = (data: Behavior) => {
  behaviorStack.push(data);
  if (behaviorStack.length > maxStackNum) {
    behaviorStack.shift();
  }
};

/**
 * 行为栈
 */
const behaviorStack: Behavior[] = [];

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

/**
 * 最大行为栈数量
 */
let maxStackNum: number;

const plugin = {
  install(options?: BehaviorOptions) {
    maxStackNum = options?.maxStackNum || 20;
    onClick();
  },
  afterErrorEvent(errorData: any) {
    pushBehaviorStack({
      type: BEHAVIORTYPES.ERROR,
      data: errorData.message,
      time: errorData.time,
    });
    console.log(behaviorStack);
  },
};

export default plugin;
