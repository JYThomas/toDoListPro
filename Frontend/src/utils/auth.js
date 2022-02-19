/*
 * @Description: 将token存储在cookie中
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-16 15:25:51
 */
import Cookies from 'js-cookie'

const TokenKey = 'AccessToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
