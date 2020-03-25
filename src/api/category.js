import request from '@/requests'

export function getAllCateTreeVo() {
  return request({
    url:'/categorys/getAllCateTreeVo',
    method:'get'
  })
}

export function getCategoryAll() {
  return request({
    url:'/categorys',
    method:'get'
  })
}
