import monitor from '@imrobot/core'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(monitor).mount('#app')
