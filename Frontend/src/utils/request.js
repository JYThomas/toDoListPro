/*
 * @Description: 
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-16 17:36:40
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import storage from "store"; //store.js


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json' //设置post的JSON数据放到body里
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //操作token鉴权都是判断localStorage里面的token状态
      config.headers['Authorization'] = storage.get('Access-Token');
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 下面的代码整合到调用接口的方式完成了
// export function get(url, params) {
//   return service.get(url, {
//       params, // get 请求时带的参数
//       timeout: 10000,
//       headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//       }
//   })
// }
// export function del(url, params) {
//   return service.delete(url, {
//       params, // get 请求时带的参数
//       timeout: 10000,
//       headers: {
//           'X-Requested-With': 'XMLHttpRequest'
//       }
//   })
// }

// // 自定义post
// export function post(url, data) {
//   return service.post(url, qs.stringify(data), {
//       timeout: 10000,
//       headers: {
//           'X-Requested-With': 'XMLHttpRequest',
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//   })
// }


export default service
