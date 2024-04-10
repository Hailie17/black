import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 组合模块的配置项
  modules: {
    user,
    menu
  }
})

// 组件中使用user模块中的数据？
// this.$store.state.user.name

// 组件触发mutation？
// this.$store.commit('user/mutation name')

// 组件触发action？
// this.$store.dispatch('user/action name')

// 场景：1. 组件中使用的state和方法很少  this.$store
// 2. 组件用到的state和方法很多  映射方法mapState  mapMutations

export default store
