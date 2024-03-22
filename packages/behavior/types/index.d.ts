import { BEHAVIORTYPES } from "@imrobot/shared";

/**
 * 行为数据
 */
export interface Behavior {
  type: BEHAVIORTYPES;
  data: string;
  time: number;
  url?: string;
  method?: string;
  status?: number;
}

/**
 * 最大行为栈数量
 */
export interface BehaviorOptions {
  maxStackNum: number;
}
