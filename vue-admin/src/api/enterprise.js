import request from '@/utils/request'

export function getEnterpriseAPI(params) {
  return request({
    url: '/park/enterprise',
    params
  })
}
