import md5 from "md5";

export const getErrorUid = (input: string): string => {
  return md5(input);
};

export const hashSet = new Set();

export function hasHash(hash: string) {
  if (hashSet.has(hash)) return true;
  hashSet.add(hash);
  return false;
}
