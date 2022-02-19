/*
 * @Description: 登录接口
 * @Author: MorantJY
 * @Date: 2022-02-15 13:25:01
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-16 16:59:18
 */
const crypto = require('crypto')
const { execSQL } = require("../database/mysql");


// 用户登录接口（仅用于获取数据）逻辑处理在Api文件处理
const login = (_todoData)=>{
    // 获取用户名与密码
    const md5 = crypto.createHash('md5'); //md5加密的密码处理 比对数据库里面md5加密后的密码
    const userName = _todoData.username;
    const password = md5.update(_todoData.password).digest('hex');
    const sql = `select * from user where User_name = '${userName}' and User_password = '${password}';`;
    return execSQL(sql);
}

//获取用户信息
const getUserInfo = (_todoData)=>{
    const userID = _todoData.User_id
    const sql = `select * from user where User_id = '${userID}' `;
    return execSQL(sql);
}

// 用户退出登录
const userLogout = (_todoData)=>{
    const userID = _todoData.User_id
    const sql = `update user set User_TOKEN = '' where User_id = '${userID}'`;
    return execSQL(sql);
}

//登录成功后将生成的token存入数据库
const setTokenInDB = (userId,_access_token) => {
    const sql = `update user set User_TOKEN = '${_access_token}' where User_id = '${userId}'`;
    return execSQL(sql);
}

module.exports = {
    login,
    getUserInfo,
    userLogout,
    setTokenInDB
}
