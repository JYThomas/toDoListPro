/*
 * @Description: 服务器业务代码
 * @Author: MorantJY
 * @Date: 2022-02-11 21:57:03
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-15 14:07:27
 */
const handleTodoRoute = require("./src/routes/TodoApi.js");
const querystring = require('querystring');

// Promise异步处理post数据
const getPostData = (req)=>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== "POST"){
            resolve({});
            return;
        }
        if(req.headers["content-type"] !== "application/json"){
            resolve({});
            return;
        }
        let postData = "";
        req.on("data",(chunk)=>{
            postData += chunk.toString();
        });

        req.on("end",()=>{
            if(!postData){
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        });
    });
    return promise;
}

const serverHandler = (req,res)=>{
    // 设置访问格式
    res.setHeader('Content-Type', 'application/json'); //注意-是英文符号

    // 获取路由path
    const url = req.url;
    req.path = url.split("?")[0];

    //解析查询字符串query(?后面的参数)
    req.query = querystring.parse(url.split("?")[1]);
    
    // 处理post数据
    getPostData(req).then((postData)=>{
        req.body = postData;
        // Todo相关路由
        const TodoDataPromise = handleTodoRoute(req,res);
        if(TodoDataPromise){
            TodoDataPromise.then((todoData)=>{
                res.end(
                    JSON.stringify(todoData)
                );
            });
            return;
        }

        // 处理路由未命中的问题返回404页面
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write("404 Not Found123");
        res.end();

    });
}

module.exports = serverHandler;