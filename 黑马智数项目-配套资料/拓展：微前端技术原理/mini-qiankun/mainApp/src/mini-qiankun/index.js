// 实现基础的乾坤加载并渲染子应用
import importHTML from 'import-html-entry'
// 1. 实现注册子应用配置的方法
let appConfig = null

export function registerMicroApp (config) {
  appConfig = config
}

export function getAppConfig () {
  return appConfig
}

// 2. 匹配路由规则

// 在已经存在的VueRouter中增加我们自己的匹配规则

// history 

// go back   popstate事件  - 增加一个新的事件回调
// pushState  - 覆写方法的模式 [覆盖原本的方法 在自己的方法中把原本的方法执行一遍]

function rewirteRouter () {
  window.addEventListener('popstate', () => {
    matchRouteRule()
  })

  const orginalPushState = window.history.pushState
  window.history.pushState = function (...rest) {
    // 1. 执行原本的方法的逻辑
    orginalPushState.apply(window.history, rest)
    // 2. 插入我们自己的逻辑
    // 3. 匹配路由规则
    matchRouteRule()
  }
}

let activeApp = null

function matchRouteRule () {
  // 3.1 拿到当前url上的路径
  const path = window.location.pathname
  // 3.2 拿到注册好的所有的配置项
  const appConfig = getAppConfig()
  const app = appConfig.find(item => item.activeRule === path)
  activeApp = activeApp || app
  if (app) {
    // 加载子应用
    loadMicroApp(app)
  } else {
    // 卸载子应用
    // 1. 把加载过的子应用移除掉 2. 执行__qiankunUnMount方法
    document.querySelector(activeApp.container).innerHTML = ''
    window.__qiankunUnMount()
  }
}

// 3. 加载子应用
// 1. 通过网络请求获取到子应用的html资源 fetch
// 2. 解析html内部的资源 css script（重点） eval  


function loadMicroApp (app) {
  importHTML(app.entry).then(async res => {
    const template = res.template
    // 4. 渲染子应用
    // 4.1. 把模版渲染出来 tempalte渲染到对应的节点上
    const container = document.querySelector(app.container)
    container.innerHTML = initScopedCss(template)
    // 4.2. 把脚本执行一下
    res.execScripts().then(() => {
      // 实现mount方法的执行
      window.__qiankunMount()
    })
  })
}

// css样式隔离  css全局作用域  主应用和子应用 类名相同 样式互相影响
// 解决方案：
// 1. 人力约束 命名空间  __app1_container
// 2. shadow DOM 
// 3. 前置的选择器限定样式作用的范围  vue scoped   
//   1. body <div mini-qiankun> 原始的模版 </div>
//   2. style div[mini-qiankun] .btn {}


function initScopedCss (template) {

  const regexBody = /<body>([\s\S]*?)<\/body>/gi
  template = template.replace(regexBody, (_, b) => {
    return `<body><div data-mini-qiankun>${b}</div></body>`
  })


  const prefix = 'div[data-mini-qiankun]'
  const regex = /\.([\w-]+)/g
  template = template.replace(regex, `${prefix} $&`)
  return template
}

// 启动方法
export function start () {
  rewirteRouter()
}