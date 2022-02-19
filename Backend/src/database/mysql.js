/*
 * @Description: 数据库链接
 * @Author: MorantJY
 * @Date: 2022-02-12 15:36:25
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-12 16:20:10
 */
const mysql = require("mysql");
const {MYSQL_CONFIG} = require("../config/dbConfig");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始链接
connection.connect();

function execSQL(sql){
    const promise = new Promise((resolve,reject)=>{
        connection.query(sql,(error,result)=>{
            if(error){
                reject(error);
                return;
            }
            resolve(result);
        })
    });
    return promise;
}


// 关闭连接
// connection.end();

module.exports = {
    execSQL
}

