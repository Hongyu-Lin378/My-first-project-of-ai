import axios from 'axios'

const request = axios.create({
  baseURL: 'http://159.75.169.224:1236',
  timeout: 300000,
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
// 处理流式接口
export async function fetchStream(url, data, onChunk, onComplete, onError) {
  // 中止的请求控制器
  const controller = new AbortController()

  const response = await fetch(`http://159.75.169.224:1236/api/travel/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    signal: controller.signal
  })

  // 创建响应体的可读流读取器
  const reader = response.body.getReader()
  // 将二进制数据解码为字符串
  const decoder = new TextDecoder()

  let result = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break;
    const chunk = decoder.decode(value, { stream: true })
    console.log(chunk)
const lines = chunk.split('\n').filter(line => line.trim())
for (const line of lines) {
  if (line.startsWith('data:')) {
    const jsonStr = line.substring(5)
  
      try {
        if (jsonStr) {
        const jsonData = JSON.parse(jsonStr)
        if (jsonData.type === 'chunk') {
          // 分片的数据
          onChunk(jsonData.content)
        } else if (jsonData.done) {
          // 完成的数据
          onComplete()
        } else if (jsonData.error) {
          // 错误的数据
          onError(jsonData.error)
        }
      }} catch (err) {
       onError('解析失败')
      }
    }
  }
}


  return controller.abort()
}
export default request
