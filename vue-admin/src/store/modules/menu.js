import { getProfileAPI } from '@/api/user'
export default {
  namespaced: true,
  namespaced: true,
  state: () => {
    return {
      profile: {}
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async getProfile(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setProfile', res.data)
    }
  }
}
