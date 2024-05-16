import { Monitor } from "@imrobot/monitor-helpers";
import { Behavior } from "../types";

export let monitor: Monitor;
export let maxStackNum: number;
export const behaviorStack: Behavior[] = [];

export enum BEHAVIORTYPES {
  CLICK = 1,
  NAVIGATION = 2,
}

export const setupMonitor = (instance: Monitor) => {
  monitor = instance;
};

export const setMaxStackNum = (val?: number) => {
  maxStackNum = val || 20;
};

export const pushBehaviorStack = (data: Behavior) => {
  behaviorStack.push(data);
  if (behaviorStack.length > maxStackNum) {
    monitor.reportData("/action", { data: behaviorStack });
    behaviorStack.length = 0;
  }
};

/**
 * 将 DOM 元素转换为 JSON 格式
 * @param domElement
 */
export function domToJson(domElement: HTMLElement) {
  /**
   * 创建一个对象来保存 DOM 元素的信息
   */
  const elementJson: any = {
    tagName: domElement.tagName.toLowerCase(),
    attributes: {},
    children: [],
  };

  /**
   * 遍历 DOM 元素的属性，并添加到 attributes 对象中
   */
  for (let i = 0; i < domElement.attributes.length; i++) {
    const attr = domElement.attributes[i];
    elementJson.attributes[attr.name] = attr.value;
  }

  /**
   * 遍历 DOM 元素的子节点，并递归调用 domToJson 函数处理子节点
   */
  for (let i = 0; i < domElement.childNodes.length; i++) {
    const childNode = domElement.childNodes[i] as HTMLElement;
    if (childNode.nodeType === 1) {
      /**
       * 元素节点
       */
      elementJson.children.push(domToJson(childNode));
    } else if (childNode.nodeType === 3 && childNode.nodeValue?.trim() !== "") {
      /**
       * 文本节点
       */
      elementJson.children.push(childNode.nodeValue);
    }
  }

  return elementJson;
}
