import { BEHAVIORTYPES, getTimestamp } from "@imrobot/shared";
import { Behavior } from "../types";
import { behaviorStack, pushBehaviorStack } from "./shared";

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
 * 重写 popstate 事件
 */
const replacePopstate = () => {
  const originalPopstate = window.onpopstate;
  window.onpopstate = function (...args: any[]) {
    const from = lastHref;
    const to = getLocationHref();
    lastHref = to;

    const data: Behavior = {
      type: BEHAVIORTYPES.NAVIGATION,
      data: `${from} - ${to}`,
      time: getTimestamp(),
    };

    pushBehaviorStack(data);

    console.log(behaviorStack);

    originalPopstate && originalPopstate.apply(this, args);
  };
};

/**
 * 重写 pushstate 方法
 */
const replacePushstate = () => {
  const orginalPushstate = history.pushState;

  history.pushState = function (...args: any[]) {
    const from = lastHref;
    const to = args[2];
    lastHref = to;

    const data: Behavior = {
      type: BEHAVIORTYPES.NAVIGATION,
      data: `${from} - ${to}`,
      time: getTimestamp(),
    };

    pushBehaviorStack(data);

    console.log(behaviorStack);

    orginalPushstate.apply(this, args);
  };
};

/**
 * 监听路由跳转
 */
export const onNavigation = () => {
  replacePopstate();
  replacePushstate();
};
