import { BEHAVIORTYPES } from "@imrobot/shared";

/**
 * 行为数据
 */
export interface Behavior {
  type: BEHAVIORTYPES;
  content: string;
  time: number;
}

/**
 * 最大行为栈数量
 */
export interface BehaviorOptions {
  maxStackNum: number;
}
