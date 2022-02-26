/*
 * @Description: dashBoard统计页面数据接口
 * @Author: MorantJY
 * @Date: 2022-02-25 14:43:39
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 22:56:52
 */

const { execSQL } = require("../database/mysql");

// 获取用户所有数据
const getStatisticsData = (userData)=>{
    const User_id = userData.User_id;
    let sql = `select * from todo where Todo_userId = '${User_id}'`;
    return execSQL(sql);
}


module.exports = {
    getStatisticsData
}