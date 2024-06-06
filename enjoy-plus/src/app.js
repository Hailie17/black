// app.js
import utils from './utils/utils'
import http from './utils/http'
// 注册到wx全局对象上
wx.utils = utils
wx.http = http

App({
  onLaunch() {
    // 读取 token
    this.getToken()
  },
  getToken() {
    // 读取本地的token
    this.token = wx.getStorageSync('token')
    this.refreshToken = wx.getStorageSync('refreshToken')
  },
  setToken(key,token){
    this[key] = token
    wx.setStorageSync(key, token)
  },
  globalData: {},
})
