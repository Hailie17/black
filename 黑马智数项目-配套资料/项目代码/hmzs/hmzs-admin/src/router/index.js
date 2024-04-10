import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 俩种路由

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/addCard',
    component: () => import('@/views/Car/CarCard/add-card'),
    hidden: true
  },
  {
    path: '/addEnterprise',
    component: () => import('@/views/Park/Enterprise/AddEnterprise'),
    hidden: true
  },
  {
    path: '/enterpriseDetail',
    component: () => import('@/views/Park/Enterprise/EnterpriseDetail'),
    hidden: true
  },
  {
    path: '/addRole',
    component: () => import('@/views/System/Role/AddRole'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench'
  },
  // 只有一级路由
  // 一级路由：负责把layout架子渲染出来
  // 二级路由：path为空 会作为默认的二级路由一上来就渲染出来
  {
    path: '/workbench',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/Workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  // 1. 路由表->routes
  // 2. routes -> 真实的路由对象(内部维护不可见) -> 决定了访问某个path渲染某个组件

  // addRoute(route) -> 真实的路由对象(内部维护不可见)
  // addRoute 动态添加 想在什么时机下往路由中添加路由表都可以 而不受限于初始化阶段

  routes: [...routes]
})

const router = createRouter()

// 重置路由方法 [不是官方方法 作者hack出来]
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher
}

export default router
