// app.js
import utils from './utils/utils'
import http from './utils/http'
// 注册到wx全局对象上
wx.utils = utils
wx.http = http

App({
  token: wx.batchGetStorageSync('token'),
  globalData: {},
})
