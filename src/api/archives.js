import request from '@/requests'

export function listArchives(page) {
  return request({
    url:'/articles/listArchives',
    method:'get',
    params:{
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
    }
  })
}
