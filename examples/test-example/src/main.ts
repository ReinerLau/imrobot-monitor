import monitor, { behavior, screen } from '@imrobot/monitor'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

monitor.use(behavior, {
  maxStackNum: 10
})

monitor.use(screen, {
  checkoutEveryNms: 1000 * 3
})

createApp(App).use(monitor, { mode: 'any' }).use(router).mount('#app')
