import request from '@/utils/request'

export function getBuildingListAPI(params) {
  return request({
    url: '/park/building',
    params
  })
}

export function getBuildingRentListAPI() {
  return request({
    url: '/park/rent/building'
  })
}
