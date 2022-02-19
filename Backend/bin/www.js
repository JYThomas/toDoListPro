/*
 * @Description: 服务器程序执行文件
 * @Author: MorantJY
 * @Date: 2022-02-11 21:56:55
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-12 16:22:42
 */

const http = require("http");
const serverHandler = require("../app.js");
const PORT = 8888;
const server = http.createServer(serverHandler);

server.listen(PORT,()=>{
    console.log("server running at port 8888...");
});