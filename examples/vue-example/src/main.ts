import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import './styles/app.css'
import monitor from '@imrobot/core'

createApp(App).use(naive).use(monitor).mount('#app')
