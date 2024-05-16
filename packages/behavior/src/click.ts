import { BEHAVIORTYPES, domToJson, pushBehaviorStack } from "./helpers";

export const onClick = () => {
  /**
   * 保存原生的 addEventListener 方法
   */
  const originalAddEventListener = HTMLElement.prototype.addEventListener;

  /**
   * 修改 HTMLElement 原型链 addEventListener 方法
   */
  HTMLElement.prototype.addEventListener = function (
    this: HTMLElement,
    type: string,
    listener:
      | EventListenerOrEventListenerObject
      | ((this: HTMLElement, ev: Event) => any),
    options?: boolean | AddEventListenerOptions
  ): void {
    if (type === "click") {
      const fnListener = listener as (this: HTMLElement, ev: Event) => any;

      const wrappedListener = function (this: HTMLElement, event: Event) {
        const target = event.target as HTMLElement;

        pushBehaviorStack({
          type: BEHAVIORTYPES.CLICK,
          data: JSON.stringify(domToJson(target)),
          timestamp: Date.now(),
        });

        fnListener.call(this, event);
      };

      return originalAddEventListener.call(
        this,
        type,
        wrappedListener as EventListenerOrEventListenerObject,
        options
      );
    } else {
      /**
       * 直接调用原始方法
       */
      return originalAddEventListener.call(this, type, listener, options);
    }
  };
};
