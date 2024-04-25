import monitor, { behavior, screen } from '@imrobot/monitor'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

monitor.use(behavior, {
  maxStackNum: 10
})

monitor.use(screen)

createApp(App).use(monitor).use(router).mount('#app')
