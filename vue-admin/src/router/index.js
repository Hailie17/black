import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 1. 动态路由: 需要做权限控制 可以根据不同的权限 数量上的变化
// 2. 静态路由: 不需要做权限控制 每一个用户都可以看到 初始化的时候初始化一次

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Workbench/index'),
        meta: { title: '工作台', icon: 'el-icon-data-board' }
      }
    ]
  },
  {
    path: '/cardAdd',
    component: () => import('@/views/Car/CarCard/components/AddCard.vue')
  },
  {
    path: '/sys/addRole',
    component: () => import('@/views/System/Role/AddRole.vue')
  },
  {
    path: '/park/addEnterprise',
    component: () => import('@/views/Park/Enterprise/components/AddEnterprise.vue')
  },
  {
    path: '/exterpriseDetail/:id',
    component: () => import('@/views/Park/Enterprise/components/enterprise.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })

const router = createRouter()

// 重置路由方法
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher
}

export default router
