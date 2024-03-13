export function domToJson(domElement: HTMLElement) {
  // 创建一个对象来保存 DOM 元素的信息
  const elementJson: any = {
    tagName: domElement.tagName.toLowerCase(), // 标签名
    attributes: {}, // 属性对象
    children: [], // 子元素数组
  }

  // 遍历 DOM 元素的属性，并添加到 attributes 对象中
  for (let i = 0; i < domElement.attributes.length; i++) {
    const attr = domElement.attributes[i]
    elementJson.attributes[attr.name] = attr.value
  }

  // 遍历 DOM 元素的子节点，并递归调用 domToJson 函数
  for (let i = 0; i < domElement.childNodes.length; i++) {
    const childNode = domElement.childNodes[i] as HTMLElement
    if (childNode.nodeType === 1) {
      // 元素节点
      elementJson.children.push(domToJson(childNode))
    } else if (childNode.nodeType === 3 && childNode.nodeValue?.trim() !== '') {
      // 文本节点
      elementJson.children.push(childNode.nodeValue)
    }
    // 可以根据需要处理其他类型的节点，如注释节点等
  }

  return elementJson
}

export interface ActionType {
  type: 'click' | 'request'
  time: number
  value: any
}

export function addUserAction(action: ActionType) {
  let userAction = JSON.parse(localStorage.getItem('imrobotMonitorUserAction') || '[]')

  // 向数组添加新的数据
  userAction.push(action)

  // 检查数组长度是否超过限制
  if (userAction.length > 10) {
    // 移除数组的第一条数据
    userAction.shift()
  }

  // 将更新后的数组存储回 localStorage
  localStorage.setItem('imrobotMonitorUserAction', JSON.stringify(userAction))
}
