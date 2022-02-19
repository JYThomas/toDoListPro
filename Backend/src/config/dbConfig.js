/*
 * @Description: 数据库链接配置文件
 * @Author: MorantJY
 * @Date: 2022-02-12 15:57:13
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-12 15:58:16
 */

let MYSQL_CONFIG = {}

MYSQL_CONFIG = {
    host:"localhost",
    user:"root",
    password:"123456",
    port:3306,
    database:"todolist"
}

module.exports = {
    MYSQL_CONFIG
}
