/*
 * @Description: dashBoard统计页面数据接口
 * @Author: MorantJY
 * @Date: 2022-02-25 14:43:39
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 16:01:51
 */

const { execSQL } = require("../database/mysql");

// 获取用户所有数据
const getStatisticsData = (userData)=>{
    const User_id = userData.User_id;
    let sql = `select * from todo where Todo_userId = '${User_id}'`;
    return execSQL(sql);
}

// 获取状态统计数据
const getStateStatistics = (userData)=>{
    const Todo_userId = userData.User_id;
    const sql = `
        insert into todo (Todo_name,Todo_createTime,Todo_state,Todo_typeId,Todo_userId) values ('${Todo_name}','${Todo_createTime}','${Todo_state}','${Todo_typeId}','${Todo_userId}');
    `;
    return execSQL(sql);
}



module.exports = {
    getStatisticsData
}