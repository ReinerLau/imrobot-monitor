import monitor, { behavior, screen } from '@imrobot/core'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

monitor.use(behavior, {
  maxStackNum: 10
})

monitor.use(screen, {
  checkoutEveryNms: 1000 * 3
})

createApp(App).use(monitor).use(router).mount('#app')
