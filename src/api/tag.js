import request from '@/requests'

export function getArticleSummaryByTagId(id) {
  return request({
    url:`/articles/getArticleSummaryByTagId/${id}`,
    method:'get'
  })
}

export function listHotTags() {
  return request({
    url:`/tags/hot`,
    method:'get'
  })
}

export function findAll() {
  return request({
    url:'/tags',
    method:'get'
  })
}
