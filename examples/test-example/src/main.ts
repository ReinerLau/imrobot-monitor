import monitor from '@imrobot/core'

import { createApp } from 'vue'
import App from './App.vue'

import screen from '@imrobot/screen'
import behavior from '@imrobot/behavior'

monitor.use(behavior, {
  maxStackNum: 3
})

monitor.use(screen, {
  checkoutEveryNms: 1000 * 3
})

createApp(App).use(monitor).mount('#app')
