import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
// 获取一级权限标识
function getFirstPermission(permissions) {
  const firtsPermArr = permissions.map(item => {
    return item.split(':')[0]
  })
  // 去重 set不能存在重复的数组
  return Array.from(new Set(firtsPermArr))
}

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
      await store.dispatch('menu/getProfile')
      const profile = store.state.menu.profile
      console.log(profile)
      getFirstPermission(profile.permissions)
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('login')
    }
  }
})
