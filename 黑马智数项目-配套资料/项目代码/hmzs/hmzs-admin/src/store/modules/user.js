import { loginAPI, getProfileAPI } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  // 数据状态 响应式  data
  state: {
    token: getToken() || '',
    userProfile: {} // 个人信息
  },
  // 同步修改 Vuex架构中 有且只有一种提交mutation
  mutations: {
    setToken(state, newToken) {
      // 存入vuex
      state.token = newToken
      // cookies也存一份
      setToken(newToken)
    },
    clearUserInfo(state) {
      state.token = ''
      state.userProfile = {}
      removeToken()
    },
    setProfile(state, userProfile) {
      state.userProfile = userProfile
    }
  },
  // 异步 接口请求 + 提交mutation
  actions: {
    async asyncLogin(ctx, { username, password }) {
      // 1. 调用登录接口
      const res = await loginAPI({ username, password })
      // 2. 提交mutation
      ctx.commit('setToken', res.data.token)
    },
    async getUserProfile(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setProfile', res.data)
      // 这里如果想要当前函数内的数据给到另外一个js模块使用
      // 直接把目标数据return出去
      return res.data.permissions
    }
  }
}
