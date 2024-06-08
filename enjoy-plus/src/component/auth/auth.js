// component/auth.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {},
  lifetimes: {
    attached(){
      const app = getApp()
      const isLogin = Boolean(app.token)
      this.setData({
        isLogin
      })
      if(!isLogin) {
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        // 重写页面的生命周期函数，未登录时，不执行里面的方法
        page.onLoad = () => {}
        page.onShow = () => {}
        page.onReady = () => {}
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + page.route,
        })
      }
    }
  }
})