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
