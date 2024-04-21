import request from '@/utils/request'

/**
 * 上传文件
 */
export function uploadFiles(form) {
  return request({
    url: '/upload',
    method: 'POST',
    data: form
  })
}
