import axios from 'axios'

axios.defaults.timeout = 60000
axios.defaults.baseURL = 'http://localhost:1996'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
})

export default axios
