## 功能

- 错误采集
- 源码定位
- 行为记录
- 录屏

## 使用

### 基本用法

```ts
import { createApp } from "vue";
import monitor from "@imrobot/core";
import App from "./App.vue";

createApp(App).use(monitor).mount("#app");
```

### 拓展

```ts
import { createApp } from "vue";
import monitor, { behavior, screen } from "@imrobot/core";
import App from "./App.vue";

monitor.use(behavior);
monitor.use(screen);

createApp(App).use(monitor).mount("#app");
```
