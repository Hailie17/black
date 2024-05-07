import router from '@/router'
import { asyncRoutes } from '@/router/asyncRoutes'
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

// 根据权限标识过滤路由表
function getRoutes(firstRoutePerms, secondRoutePerms, asyncRoutes) {
  console.log(firstRoutePerms)
  if (firstRoutePerms.includes('*')) {
    // 管理员
    return asyncRoutes
  }
  // 根据一级和二级对动态路由表做过滤 return出去过滤之后的路由表
  // 1. 根据一级路由对动态路由表做过滤
  const firstRoutes = asyncRoutes.filter(route => {
    return firstRoutePerms.includes(route.permission)
  })
  return firstRoutes.map(item => {
    // 2. 对二级路由做过滤
    return {
      ...item,
      children: item.children.filter(item => secondRoutePerms.includes(item.permission))
    }
  })
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
      const routes = getRoutes(firstPermissions, secondPermissions, asyncRoutes)
      // 添加动态路由, 把筛选后的路由展示在左侧
      routes.forEach(item => router.addRoute(item))
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('login')
    }
  }
})
