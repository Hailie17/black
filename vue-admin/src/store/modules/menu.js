import { getProfileAPI } from '@/api/user'
import { routes, resetRouter } from '@/router'
export default {
  namespaced: true,
  namespaced: true,
  state: () => {
    return {
      profile: {},
      menuList: [...routes] // 存入动态筛选过后的路由表
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile
    },
    setMenuList(state, asyncRoutes) {
      state.menuList = [...routes, ...asyncRoutes]
    },
    // 退出清空路由
    resetRouter(state) {
      resetRouter()
      state.menuList = [...routes]
    }
  },
  actions: {
    async getProfile(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setProfile', res.data)
    }
  }
}
