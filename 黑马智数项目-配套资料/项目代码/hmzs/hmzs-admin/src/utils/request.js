import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
// 1. 通用配置
// 2. 定制化的配置

// 通用配置

// 1. axios实例化 axios.create()  基地址配置baseURL + 超时时间timeout(100ms)
// 拓展一下:create方法可以调用多次 每次执行都会生成一个独一无二的实例
// export default const a = axios.create({baseURL:'a.com'})
// export default const b =  axios.create({baseURL:'b.com'})

// 2. 请求拦截器  请求头中添加token数据 接口鉴权 统一配置
// 客户端发送请求 - 请求拦截器(针对请求参数做处理) - 后端
// 拓展一下: 可以添加多个请求拦截器
// 客户端请求 -> 拦截器一(处理参数) -> 拦截器二 -> 后端

// 3. 响应拦截器  数据剥离res.data / 401错误处理 / 前端自定义错误处理？如果后端不管接口成功还是失败统一返回200
// 后端 -> 响应拦截器 -> 客户端
// 成功回调 200 - 300
// 失败回调 不在这个之间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加token
    const token = getToken()
    if (token) {
      // 前面是固定的写法  后面token的拼接模式由后端来决定
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
    return response.data
  },
  // 接口出错的时候自动执行这个回调
  error => {
    console.dir(error.response.data.msg)
    // 错误类型有可能有好多种 根据不同的错误码做不同的用户提示 写的位置都在这里
    Message({
      type: 'warning',
      message: error.response.data.msg
    })
    return Promise.reject(error)
  }
)

export default service
