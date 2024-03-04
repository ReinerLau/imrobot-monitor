import './assets/main.css'
import monitorSdk from 'imrobot-monitor-sdk'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(monitorSdk).mount('#app')
