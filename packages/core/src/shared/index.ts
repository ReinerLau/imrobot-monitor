/**
 * 错误类型
 * @property ERROR - 运行错误
 * @property RESOURCE - 资源加载错误
 * @property UNHANDLEDREJECTION - promise 错误
 */
export enum eventTypes {
  VUEERROR = "vue_error",
  ERROR = "error",
  RESOURCE = "resource",
  UNHANDLEDREJECTION = "unhandledrejection",
  XHR = "xhr",
}
