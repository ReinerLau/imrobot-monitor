export const hashSet = new Set();

export function hasHash(hash: string) {
  if (hashSet.has(hash)) return true;
  hashSet.add(hash);
  return false;
}
