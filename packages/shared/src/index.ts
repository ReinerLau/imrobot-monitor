/**
 * 共享变量
 */
export const global = {
  /**
   * 是否捕获到错误
   */
  hasError: false,
};

/**
 * 行为栈类型
 * @property CLICK - 点击事件
 */
export enum BEHAVIORTYPES {
  CLICK = "click",
}

/**
 * 返回当前时间戳
 * @returns 当前时间戳
 */
export const getTimestamp = () => {
  return Date.now();
};
