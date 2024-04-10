import md5 from "md5";
import { hashSet } from "../shared";

/**
 * 生成唯一编码
 * @param input 错误详情
 * @returns 唯一编码
 */
export const getErrorUid = (input: string): string => {
  return md5(input);
};

export function hasHash(hash: string) {
  if (hashSet.has(hash)) return true;
  hashSet.add(hash);
  return false;
}
