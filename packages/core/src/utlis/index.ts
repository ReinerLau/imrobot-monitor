import md5 from "md5";

/**
 * 返回当前时间戳
 * @returns {number} 当前时间戳
 */
export const getTimestamp = (): number => {
  return Date.now();
};

/**
 * 生成唯一编码
 * @param input 错误详情
 * @returns 唯一编码
 */
export const getErrorUid = (input: string): string => {
  return md5(input);
};
