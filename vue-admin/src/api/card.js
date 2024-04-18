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
    url: `parking/card/${id}`
  })
}
