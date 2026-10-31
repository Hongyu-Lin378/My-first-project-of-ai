import axios from 'axios'

const request = axios.create({
  baseURL: 'http://159.75.169.224:1236',
  timeout: 150000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：统一返回 response.data
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
