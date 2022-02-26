/*
 * @Description: Todolist相关接口
 * @Author: MorantJY
 * @Date: 2022-02-16 22:01:13
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-26 13:07:53
 */

import request from "@/utils/request";

const todoApi = {
    getTodoList: "/api/Todo/getTodoList",
    getFinishedList: "/api/Todo/getFinishedList",
    addTodo: "/api/Todo/addTodo",
    deleteTodo: "/api/Todo/deleteTodo",
    updateState: "/api/Todo/updateState",
    
    getTodayOverviewData:"/api/Todo/getTodayOverviewData",
    getStateOverviewData:"/api/Todo/getStateOverviewData",

    getTodayData:"/api/Todo/getTodayData",

    // 我的待办今日图表数据
    getTodayTodo_Finished:"/api/Todo/getTodayTodo_Finished",
    getTodayStateDistribution:"/api/Todo/getTodayStateDistribution"
}

/*
    不带参数的get请求
*/
//获取待办列表
export function getTodoList(params){
    return request({
        url: todoApi.getTodoList,
        method: 'post',
        data: params
      });
}

// 这样的方式是查询字符串的设置方法,参数是放在请求的URL中
// export function getTodoList(params){
//     return request({
//         url: todoApi.getTodoList,
//         method: 'get',
//         params: params
//       });
// }

//获取已完成列表
export function getFinishedList(){
    return request({
        url: todoApi.getFinishedList,
        method: 'get'
    });
}

//添加待办事项
export function addTodo(parameters){
    return request({
        url: todoApi.addTodo,
        method: 'post',
        data:parameters
    });
}

//删除待办事项
export function deleteTodo(parameters){
    return request({
        url: todoApi.deleteTodo,
        method: 'post',
        data:parameters
    });
}

//完成待办
export function updateState(parameters){
    return request({
        url: todoApi.updateState,
        method: 'post',
        data:parameters
    });
}

//获取待办完成状况概览
export function getTodayOverviewData(){
    return request({
        url: todoApi.getTodayOverviewData,
        method: 'get'
    });
}

//获取待办紧急程度概览
export function getStateOverviewData(){
    return request({
        url: todoApi.getStateOverviewData,
        method: 'get'
    });
}


//获取当日待办与已完成记录
export function getTodayData(){
    return request({
        url: todoApi.getTodayData,
        method: 'get'
    });
}



//获取我的待办今日图表数据
export function getTodayTodo_Finished(){
    return request({
        url: todoApi.getTodayTodo_Finished,
        method: 'get'
    });
}

//获取我的待办今日待办状态分布图表数据
export function getTodayStateDistribution(){
    return request({
        url: todoApi.getTodayStateDistribution,
        method: 'get'
    });
}





