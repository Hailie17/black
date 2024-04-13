import { loginAPI } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

export default {
  namespaced: true, // vuex模块命名空间
  state: {
    token: getToken() || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async loginActions(store, data) {
      const res = await loginAPI(data)
      store.commit('setToken', res.data.token)
    }
  },
  getters: {}
}
