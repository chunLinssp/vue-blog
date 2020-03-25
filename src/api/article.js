import request from '@/requests'

export function getArticleSummary(page) {
    return request({
      url:'/articles/getArticleSummary',
      method:'get',
      params:{
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      }
  })
}

export function publish(article) {
  return request({
    url:'/articles/publish',
    method:'post',
    data:article
  })
}

export function getRecommandTitle() {

  return request({
    url:'/articles/getRecommandTitle',
    method:'get'
  })
}

export function ArticleDetial(id) {

  return request({
    url:`/articles/view/${id}`,
    method:'get'
  })
}




