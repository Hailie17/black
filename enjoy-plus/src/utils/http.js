import http from 'wechat-http'
http.baseURL = 'https://live-api.itheima.net'

//请求拦截器
http.intercept.request = (config) => {
  config.header = {
    Authorization: 'Bearer ' + wx.getStorageSync('token'),
    ...config.header
  }
  return config
}

// 响应拦截器
http.intercept.response = (res) => {
  if (res.data.code == 10000) {
    return res.data
  } else {
    wx.utils.toast(res.data.message || '业务错误')
    return Promise.reject(res.data)
  }
}

export default http