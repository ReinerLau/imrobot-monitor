import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/test': 'http://127.0.0.1:4523/m1/884115-0-default',
      '/getMap': 'http://127.0.0.1:5174',
      '/reportData': 'http://127.0.0.1:5174',
      '/getErrorList': 'http://127.0.0.1:5174',
      '/reportEvent': 'http://127.0.0.1:5174',
      '/getEvent': 'http://127.0.0.1:5174',
      '/reportBehavior': 'http://127.0.0.1:5174',
      '/getBehavior': 'http://127.0.0.1:5174',
      '/error': 'http://localhost:3001',
      '/behavior': 'http://localhost:3001',
      '/screen': 'http://localhost:3001',
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    sourcemap: true
  }
})
