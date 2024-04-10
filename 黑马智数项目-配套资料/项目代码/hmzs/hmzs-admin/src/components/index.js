// 放置全局组件
// Vue.component('组件名称',组件的配置对象）

/**
  开发插件俩步
  1. 定义插件
     const plugin = {
       install(Vue){
         // 插件的逻辑
       }
     }
  2. 注册插件生效
     Vue.use(plugin) 相当于自动执行了插件内部的install方法并且传入Vue构造器

 */

import SfButton from './sf-button'
import AuthBtn from './AuthBtn'

const plugin = {
  install(Vue) {
    console.dir(Vue)
    Vue.component('sf-button', SfButton)
    Vue.component('auth-btn', AuthBtn)
  }
}

export default plugin
