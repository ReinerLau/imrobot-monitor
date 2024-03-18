import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      '/getErrorList': 'http://127.0.0.1:5174'
    }
  },
  build: {
    sourcemap: true
  }
})
