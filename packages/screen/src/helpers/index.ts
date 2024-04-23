export let hasNewRecord = false;

export let recordTime: number;

export const openHasNewRecord = () => {
  hasNewRecord = true;
};

export const closeHasNewRecord = () => {
  hasNewRecord = false;
};

export const setRecordTime = (val: number) => {
  recordTime = val;
};
