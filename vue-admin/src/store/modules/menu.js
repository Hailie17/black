import { getProfileAPI } from '@/api/user'
export default {
  namespaced: true,
  namespaced: true,
  state: () => {
    return {
      profile: {},
      menuList: []
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile
    },
    setMenuList(state, filterRoutes) {
      state.menuList = [...state.menuList, ...filterRoutes]
    }
  },
  actions: {
    async getProfile(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setProfile', res.data)
    }
  }
}
