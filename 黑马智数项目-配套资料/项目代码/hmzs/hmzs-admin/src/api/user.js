import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { username,password }
 * @return {*} promise
 */

// 函数: 参数 + 逻辑 + 返回值
export function loginAPI(data) {
  return request({
    url: '/park/login', // baseURL + url
    method: 'POST', // get / post / put / delete
    data: data // 请求体参数
  })
  // 返回的是一个promise
}

// loginAPI({ mobile:"13211111111", password:'123456'}).then(res=> console.log(res))

/**
 async function doLogin(){
    const res = await loginAPI({ mobile:"13211111111", password:'123456'})
 }
*/

/**
 *
 * @param {*} params {name:string, page:string, pageSize:string}
 * @returns
 */
export function getEnterPriseListAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}

/**
 *
 * @param {*} id string
 * @returns
 */

export function delEnterPriseAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'DELETE'
  })
}

/**
 * @description: 获取用户信息
 * @param {*} data {}
 * @return {*} promise
 */
export function getProfileAPI() {
  return request({
    url: '/park/user/profile',
    method: 'GET'
  })
}
