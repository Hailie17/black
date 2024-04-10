// 月卡管理相关接口
import request from '@/utils/request'

/**
 *
 * @param {*} params { page, pageSize}
 * @returns
 */
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list',
    method: 'GET',
    params
  })
}

/**
 * 新增月卡
 * @data
 * @returns
 */
export function createCardAPI(data) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}

/**
 * 获取编辑页详情
 * @param {*} id
 * @returns
 */
export function getDetailAPI(id) {
  return request({
    url: `/parking/card/detail/${id}`
  })
}

/**
 * 更新月卡
 * @param {*} data
 * @returns
 */
export function updateCardAPI(data) {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除月卡
 * @param {*} id
 * @returns
 */
export function delCardAPI(id) {
  return request({
    url: `/parking/card/${id}`,
    method: 'DELETE'
  })
}

/**
 * 删除月卡
 * @param {*} ids [1,2,3]
 * @returns
 */
export function delAllCardAPI(ids) {
  return request({
    url: `/parking/card/${ids.join(',')}`,
    method: 'DELETE'
  })
}
