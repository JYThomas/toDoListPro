/*
 * @Description: 工作台页面接口管理
 * @Author: MorantJY
 * @Date: 2022-02-25 14:37:50
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 16:10:55
 */

import request from "@/utils/request";

const dashBoardApi = {
    getOverviewStatistics: "/api/Todo/getOverviewStatistics",
    getStateStatistics: "/api/Todo/getStateStatistics"
}


//获取今日数据与累计数据
export function getOverviewStatistics(){
    return request({
        url: dashBoardApi.getOverviewStatistics,
        method: 'get'
      });
}

//获取统计待办程度数据
export function getStateStatistics(){
    return request({
        url: dashBoardApi.getStateStatistics,
        method: 'get'
    });
}