// 放置全局指令
import Vue from 'vue'
import store from '@/store'

Vue.directive('permission', {
  // el 自定义指令的dom元素
  // binding 自定义指令的绑定值
  inserted(el, binding) {
    const perms = store.state.menu.profile.permission
  }
})
