import monitor from '@imrobot/core'

import { createApp } from 'vue'
import App from './App.vue'

import screen from '@imrobot/screen'

monitor.use(screen, {
  checkoutEveryNth: 20
})

createApp(App).use(monitor).mount('#app')
