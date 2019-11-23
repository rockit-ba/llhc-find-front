import axios from 'axios'
import {getUser} from 'common/auth'

export function request(config) {
  // 1.创建axios的实例
  //baseURL: 'http://172.16.1.111:9001/',
  const instance = axios.create({
    baseURL: 'http://localhost:9001',
    timeout: 5000
  })

  instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // 每次发送请求之前检测是否有token,那么都要放在请求头发送给服务器
    // console.log("Bearer "+getUser().token)
    if (getUser().id !== undefined) {
      config.headers.Authorization = "Bearer "+getUser().token

    }
    return config
  }, err => {
    console.log(err);
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}