/*
 * @Description: 
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-16 22:13:35
 */
import request from '@/utils/request'

const userApi = {
  Login: '/api/Todo/login',
  
  getInfo: '/api/Todo/getUserInfo',
  
  Logout: '/api/Todo/userLogout'
}

// 用户登录
export function userLogin(parameters) {
  return request({
    url: userApi.Login,
    method: 'post',
    data:parameters
  })
}

//获取用户信息
export function getUserInfo() {
  return request({
    url: userApi.getInfo,
    method: 'get',
  })
}


// 用户退出
export function logout(parameters) {
  return request({
    url: userApi.Logout,
    method: 'post',
    data:parameters
  })
}
