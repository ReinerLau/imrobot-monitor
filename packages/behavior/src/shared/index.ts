import { Behavior } from "../../types";

/**
 * 最大行为栈数量
 */
export let maxStackNum: number;

export const setMaxStackNum = (val?: number) => {
  maxStackNum = val || 20;
};

/**
 * 新增行为
 * @param data 行为数据
 */
export const pushBehaviorStack = (data: Behavior) => {
  behaviorStack.push(data);
  if (behaviorStack.length > maxStackNum) {
    behaviorStack.shift();
  }
};

/**
 * 行为栈
 */
export const behaviorStack: Behavior[] = [];

export enum BEHAVIORTYPES {
  CLICK = "click",
  ERROR = "error",
  XHR = "xhr",
  NAVIGATION = "navigation",
}
