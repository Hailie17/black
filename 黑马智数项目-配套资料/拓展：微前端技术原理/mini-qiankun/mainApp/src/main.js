import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApp, start } from './mini-qiankun'

const app = createApp(App)
app.use(router)
app.mount('#app')


// 配置子应用

registerMicroApp([
  {
    name: 'big-screen',
    entry: '//127.0.0.1:5500/',
    container: '#container',
    activeRule: '/big-screen'
  }
])

start()

