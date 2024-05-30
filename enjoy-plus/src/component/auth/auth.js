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
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    }
  }
})