import request from '@/utils/request'

/**
 * 获取月卡列表
 * @param {*} params
 * @returns
 */
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list',
    params
  })
}

/**
 * 添加月卡
 * @param {} data
 * @returns
 */
export function addCardAPI(data) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}

/**
 * 月卡详情
 */
export function getCardDetailAPI(id) {
  return request({
    url: `/parking/card/${id}`
  })
}

/**
 * 编辑月卡
 */
export function editCardAPI(data) {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除月卡
 */
export function deletCardAPI(id) {
  return request({
    url: `parking/card/${id}`,
    method: 'DELETE'
  })
}
