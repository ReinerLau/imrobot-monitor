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

    console.log(from);
    console.log(to);

    oldOnpopstate && oldOnpopstate.apply(this, args);
  };
};
