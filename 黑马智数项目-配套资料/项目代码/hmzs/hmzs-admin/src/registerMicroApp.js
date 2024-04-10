// 注册子应用

import { registerMicroApps, start } from 'qiankun'

// 适配子应用在开发和上线两套环境下的加载地址

const isDev = process.env.NODE_ENV === 'development'

registerMicroApps([
  {
    name: 'big-screen', // 子应用的名字 可以随便取
    entry: `${isDev ? '//localhost:5173' : '//localhost:8089'}`, // 子项目npm run dev的地址
    container: '#bigContainer', // 子应用渲染的位置
    activeRule: '/big-screen',
    // 激活路由 url访问哪个路由地址 去加载子应用  和原本子应用的路由path保持一致
  }
])

start()