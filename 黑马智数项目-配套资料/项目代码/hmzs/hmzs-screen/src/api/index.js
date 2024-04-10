// 获取园区信息

import request from '@/utils/http'

/**
 * 获取园区信息
 * @returns 
 */
export function getParkInfoAPI () {
  return request({
    url: "/park/statistics/info"
  })
}