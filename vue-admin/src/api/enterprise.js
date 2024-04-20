import request from '@/utils/request'

/**
 * 企业列表
 * @param {} params
 * @returns
 */
export function getEnterpriseAPI(params) {
  return request({
    url: '/park/enterprise',
    params
  })
}

/**
 * 所属行业列表
 * @param {*} params
 * @returns
 */
export function getEnterpriseListAPI() {
  return request({
    url: '/park/industry'
  })
}
