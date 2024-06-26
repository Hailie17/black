import Vue from 'vue'
// 类似 reset.css 清空默认样式
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

// 测试

import router from './router'
// 注册svg
import '@/icons'

import './permission'

// 挂载乾坤
import './registerMicroApp.js'

Vue.use(ElementUI)

// 上线后，控制台不显示警告
Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
