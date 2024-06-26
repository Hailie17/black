import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import route from '@/router'
// axios.create() 创建实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 10000) {
      Message.error(response.data.msg)
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    if (error.response.status === 401) {
      store.commit('user/removeToken')
      route.push('login')
    }
    Message.error(error.response.data.msg)
    return Promise.reject(error)
  }
)

export default service
