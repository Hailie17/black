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

/**
 * 添加企业
 */
export function addEnterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'POST',
    data
  })
}
/**
 * 企业详情
 */
export function getEnterpriseInfoAPI(id) {
  return request({
    url: `/park/enterprise/${id}`
  })
}

/**
 * 编辑企业信息
 */
export function editEnterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'PUT',
    data
  })
}

/**
 * 删除企业
 */
export function deleteEnterpriseAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取可租赁的楼宇
 */
export function getBuildingListAPI() {
  return request({
    url: '/park/rent/building'
  })
}
