import request from '@/utils/request'
/**
 * 计费列表
 */
export function getRuleListAPI(params) {
  return request({
    url: 'parking/rule/list',
    params
  })
}

/**
 * 添加计费
 */
export function addFreeRuleAPI(data) {
  return request({
    url: 'parking/rule',
    method: 'POST',
    data
  })
}
