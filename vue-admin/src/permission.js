import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
// 获取一级权限标识
function getFirstPermission(permissions) {
  const firtsPermArr = permissions.map(item => {
    return item.split(':')[0]
  })
  // 去重 set不能存在重复的数组 但她不是一个真的数组
  return Array.from(new Set(firtsPermArr))
}
// 获取二级权限标识
function getSecondPermission(permissions) {
  const secondPermArr = permissions.map(item => {
    const arr = item.split(':')
    return `${arr[0]}:${arr[1]}`
  })
  return Array.from(new Set(secondPermArr))
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
      const firstPermissions = getFirstPermission(profile.permissions)
      const secondPermissions = getSecondPermission(profile.permissions)
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('login')
    }
  }
})
