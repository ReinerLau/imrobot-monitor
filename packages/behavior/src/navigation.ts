import { Behavior } from "../types";
import { BEHAVIORTYPES, pushBehaviorStack } from "./helpers";

const getLocationHref = () => {
  return document.location.href;
};

let lastHref = getLocationHref();

const replacePopstate = () => {
  const originalPopstate = window.onpopstate;
  window.onpopstate = function (...args: any[]) {
    const from = lastHref;
    const to = getLocationHref();
    lastHref = to;

    const data: Behavior = {
      type: BEHAVIORTYPES.NAVIGATION,
      data: `${from} - ${to}`,
      timestamp: Date.now(),
    };

    pushBehaviorStack(data);

    originalPopstate && originalPopstate.apply(this, args);
  };
};

const replacePushstate = () => {
  const orginalPushstate = history.pushState;

  history.pushState = function (...args: any[]) {
    const from = lastHref;
    const to = args[2];
    lastHref = to;

    const data: Behavior = {
      type: BEHAVIORTYPES.NAVIGATION,
      data: `${from} - ${to}`,
      timestamp: Date.now(),
    };

    pushBehaviorStack(data);

    orginalPushstate.apply(this, args);
  };
};

export const onNavigation = () => {
  replacePopstate();
  replacePushstate();
};
