import request from '../utils/request'

// 旅游推荐接口
// @param {Object} params { city, budget, days }
export const getTravelRecommend = (params) => {
  return request({
    url: '/api/travel/recommend',
    method: 'post',
    data: params,
  })
}
