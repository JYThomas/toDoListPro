/*
 * @Description: 
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 23:37:02
 */
import { userLogin, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import { Message } from 'element-ui' //JS文件引用ElementUI

import { ACCESS_TOKEN,USERID,USERNAME } from "@/store/mutation-types";

//store.js 是一个兼容所有浏览器的 LocalStorage 包装器，不需要借助 Cookie 或者 Flash。
//store.js 会根据浏览器自动选择使用 localStorage、globalStorage 或者 userData 来实现本地存储功能。
import storage from "store"; //store.js

const getDefaultState = () => {
  return {
    name: '',
    userID:'',
    avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    token: getToken()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, userID) => {
    state.userID = userID
  },
  SET_AVATAR: (state,avatar)=>{
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    
    return new Promise((resolve, reject) => {
      userLogin({ username: username.trim(), password: password }).then(response => {
        if(response.data.length !== 0){
          const { data } = response
          storage.set(USERID, data.User_id);
          storage.set(USERNAME, data.User_name);
          storage.set(ACCESS_TOKEN, data.User_TOKEN);

          commit('SET_NAME', data.User_name)
          commit('SET_ID', data.User_id)
          commit('SET_TOKEN', data.User_TOKEN)

          setToken(data.User_TOKEN);//将token存放到cookie里面 路由守卫permission要用到
          
          resolve()
        }
        else{
          Message({
            message: '用户名或密码错误,请重试！',
            type: 'error'
          })
          resolve()
        }

      }).catch(error => {
        reject(error)
      })
    })
  },

  // 每次刷新页面的时候都要用token获取用户信息，保证是当前token所代表的用户
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response; //response返回的是一个对象数组

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        storage.set(USERID, data[0].User_id);
        storage.set(USERNAME, data[0].User_name);
        storage.set(ACCESS_TOKEN, data[0].User_TOKEN);

        commit('SET_NAME', data[0].User_name);
        commit('SET_ID', data[0].User_id);
        commit('SET_TOKEN', data[0].User_TOKEN);
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        storage.remove('username');
        storage.remove('Access-Token');
        storage.remove('userID');

        commit('SET_NAME', '');
        commit('SET_ID', '');
        commit('SET_TOKEN', '');

        removeToken() // must remove cookie token 
        
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // remove token（路由守卫用到）
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

