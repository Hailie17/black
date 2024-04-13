import { loginAPI } from '@/api/user'

export default {
  namespaced: true, // vuex模块命名空间
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
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
