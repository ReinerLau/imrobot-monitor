import monitor from '@imrobot/core'

import { createApp } from 'vue'
import App from './App.vue'

import screen from '@imrobot/screen'
import behavior from '@imrobot/behavior'

import router from './router'

monitor.use(behavior, {
  maxStackNum: 10
})

monitor.use(screen, {
  checkoutEveryNms: 1000 * 3
})

createApp(App).use(monitor).use(router).mount('#app')
