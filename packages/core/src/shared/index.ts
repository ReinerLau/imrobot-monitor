/**
 * 错误类型
 * @property ERROR - 运行错误
 * @property RESOURCE - 资源加载错误
 */
export enum eventTypes {
  ERROR = "error",
  RESOURCE = "resource",
  UNHANDLEDREJECTION = "unhandledrejection",
}
