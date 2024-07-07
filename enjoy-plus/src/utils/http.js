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
http.intercept.response = async (res) => {
  if (res.data.code == 10000) {
    return res.data
  }else if(res.data.code == 401){
    const app = getApp()
    console.log(res.config.url,766);
    if (res.config.url.includes('/refreshToken')) {
      app.setToken('token', '')
      app.setToken('refreshToken', '')
      const pages= getCurrentPages() // 获取当前页
      const page = pages[pages.length - 1]
      wx.redirectTo({
        url: 'page/login/index?redirectUrl=/' + page.route,
      })
      return
    }
    const res2 = await http.post('/refreshToken',{},{header: {Authorization: 'Bearer ' + wx.getStorageSync('refreshToken')}})
    console.log(res2,222);
    app.setToken('token', res2.data.token)
    app.setToken('refreshToken', res2.data.refreshToken)
    res.config.header = {
      Authorization: 'Bearer ' + wx.getStorageSync('token'),
    }
    // 重新获取请求
    return http(res.config)
  } else {
    wx.utils.toast(res.data.message || '业务错误')
    return Promise.reject(res.data)
  }
}

export default http