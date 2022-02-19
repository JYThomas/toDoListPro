/*
 * @Description: 获取数据库中数据的方法
 * @Author: MorantJY
 * @Date: 2022-02-11 23:58:03
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-19 15:43:30
 */
const { execSQL } = require("../database/mysql");

// 获取待办todo数据
const getTodoList = (userData,todoData)=>{
    const User_id = userData.User_id;
    const Todo_name = todoData.Todo_name;

    // 拼接字符串处理SQL条件
    let sql = `select * from todo where 1=1 and Todo_userId = '${User_id}' and Todo_state = 'false'`;
    if(Todo_name!=null && !Todo_name==""){
        sql += " and Todo_name like '%"+Todo_name+"%'";
    }
    return execSQL(sql);
}

// 获取已完成todo数据
const getFinishedList = (userData)=>{
    const User_id = userData.User_id;
    const sql = `select * from todo where Todo_userId = '${User_id}' and Todo_state = 'true';`;
    return execSQL(sql);
}

// 新增待办数据
const addTodoData = (userData,todoData)=>{
    const Todo_userId = userData.User_id;
    const Todo_name = todoData.Todo_name; //待办事项内容
    const Todo_createTime = todoData.Todo_createTime;
    const Todo_state = todoData.Todo_state;
    const Todo_typeId = todoData.Todo_typeId;
    const sql = `
        insert into todo (Todo_name,Todo_createTime,Todo_state,Todo_typeId,Todo_userId) values ('${Todo_name}','${Todo_createTime}','${Todo_state}','${Todo_typeId}','${Todo_userId}');
    `;
    return execSQL(sql);
}

// 删除待办数据
const deleteTodoData = (todoData)=>{
    const Todo_id = todoData;
    const sql = `delete from todo where Todo_id = '${Todo_id}';`;
    return execSQL(sql);
}

//更新待办状态(变更为已完成)
const updateState = (todoData)=>{
    const Todo_id = todoData;
    const sql = `update todo set Todo_state = 'true' where Todo_id = '${Todo_id}'`;
    return execSQL(sql);
}

//获取今日待办概览图表数据
const getTodayOverviewData = (userData)=>{
    const Todo_userId = userData.User_id;
    const sql = `
    select COUNT(*) as 'value',Todo_state AS state from todo where Todo_userId = '${Todo_userId}' GROUP BY Todo_state
    `;
    return execSQL(sql);
}

//获取今日状态概览图表数据
const getStateOverviewData = (userData)=>{
    const Todo_userId = userData.User_id;
    const sql = `
    select COUNT(*) as 'value',Todo_typeId AS type from todo where Todo_userId = '${Todo_userId}' GROUP BY Todo_typeId
    `;
    return execSQL(sql);
}

module.exports = {
    getTodoList,
    getFinishedList,
    addTodoData,
    deleteTodoData,
    updateState,

    getTodayOverviewData,
    getStateOverviewData
}