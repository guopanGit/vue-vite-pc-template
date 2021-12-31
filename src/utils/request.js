import axios from 'axios'
import Qs from 'qs'

let baseURL = window.localStorage.getItem('baseURL')
console.log(baseURL);
if (!baseURL) {
  baseURL = '/'
}

const service = axios.create({
  baseURL,
  timeout: 6000, // 请求超时时间
})

// 请求前的统一处理
service.interceptors.request.use(
  (config) => {
    let Authorization = sessionStorage.getItem('token')
    if (Authorization) {
      config.headers.Authorization = Authorization
    }
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (config.data && config.method === 'get') {
      config.url = `${config.url}?${Qs.stringify(config.data)}`
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
