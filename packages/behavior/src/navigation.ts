import { BEHAVIORTYPES, getTimestamp } from "@imrobot/shared";
import { Behavior } from "../types";
import { pushBehaviorStack } from "./shared";

/**
 * 获取当前 URL
 * @returns 当前 URL
 */
const getLocationHref = () => {
  return document.location.href;
};

/**
 * 上一个 URL
 */
let lastHref = getLocationHref();

/**
 * 监听路由跳转
 */
export const onNavigation = () => {
  const oldOnpopstate = window.onpopstate;
  window.onpopstate = (...args: any[]) => {
    const from = lastHref;
    const to = getLocationHref();
    lastHref = to;

    const data: Behavior = {
      type: BEHAVIORTYPES.NAVIGATION,
      data: `${from} - ${to}`,
      time: getTimestamp(),
    };

    pushBehaviorStack(data);

    oldOnpopstate && oldOnpopstate.apply(this, args);
  };
};
