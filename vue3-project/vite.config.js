import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 这里的名称要和主应用改造是配置项中的name保持一致
    qiankun('hmzs-big-screen', {
      useDevMode: true
    })
  ],
  server: {
    // 防止开发阶段的assets 静态资源加载问题
    origin: '//localhost:5173'
  },
  //1. 配置别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
