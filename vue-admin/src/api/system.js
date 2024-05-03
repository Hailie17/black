import request from '@/utils/request'

/**
 * 查询角色列表
 */
export function getRoleListAPI() {
  return request({
    url: '/park/sys/role'
  })
}

/**
 * 获取tree权限列表
 * @returns
 */
export function getTreeListAPI() {
  return request({
    url: '/park/sys/permision/all/tree'
  })
}

/**
 * 获取当前角色权限点列表
 * @returns
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`
  })
}

/**
 * 获取角色成员列表
 * @returns
 */
export function getRoleUserAPI(roleId, params) {
  return request({
    url: `/park/sys/roleUser/${roleId}`,
    params
  })
}
