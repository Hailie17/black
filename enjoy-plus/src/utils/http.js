import http from 'wechat-http'
http.baseURL = 'https://live-api.itheima.net'

// 响应拦截器
http.intercept.response = (res) => {
  return res.data
}

export default http