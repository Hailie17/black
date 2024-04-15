import request from '@/utils/request'

export function getCardListAPI(params) {
  return request({
    url: ' /parking/card/list',
    data: params
  })
}
