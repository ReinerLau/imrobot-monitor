# 安装

```shell
pnpm add @imrobot/monitor @imrobot/monitor-behavior @imrobot/monitor-screen
```

# 引入

```ts
import monitor from "@imrobot/monitor";
import behavior from "@imrobot/monitor-behavior";
import screen from "@imrobot/monitor-screen";

import { createApp } from "vue";
import App from "./App.vue";

monitor.use(behavior, {
  maxStackNum: 10,
});

monitor.use(screen);

createApp(App).use(monitor).mount("#app");
```

# 配置外部接口

```ts
createApp(App).use(monitor, { baseURL: "http://localhost:3001" }).mount("#app");
```
