import { ErrorTypes } from "@imrobot/shared";

export let hasError = false;

export let errorType: ErrorTypes;

export const openHasError = () => {
  hasError = true;
};

export const closeHasError = () => {
  hasError = false;
};

export const setErrorType = (val: ErrorTypes) => {
  errorType = val;
};
