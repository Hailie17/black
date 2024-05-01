import request from '@/utils/request'

/**
 * 查询角色列表
 */
export function getRoleListAPI() {
  return request({
    url: '/park/sys/role'
  })
}
