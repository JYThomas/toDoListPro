/*
 * @Description: 处理TodoList相关路由,不同的路由处理不同的数据，做不同的操作(不同的路径请求不同的数据)
 * @Author: MorantJY
 * @Date: 2022-02-11 22:22:32
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-19 15:42:47
 */
const jwt = require('jsonwebtoken'); //导入JSONWEBTOKEN包 使用npm install jsonwebtoken安装JWT包
const { TOKEN_SECRET_CONFIG } = require("../config/tokenSecretKeyConfig");
const { successModel,ErrorModel } = require("../model/responseModel")
const { 
    getTodoList,
    getFinishedList,
    addTodoData,
    deleteTodoData,
    updateState,
    
    getTodayOverviewData,
    getStateOverviewData
} = require("../controllers/Todo");

const {
    login,
    getUserInfo,
    userLogout,
    setTokenInDB,
} = require("../controllers/login");

const handleTodoRoute = (req,res)=>{
    // 定义处理路由逻辑
    const method = req.method;

    //post JSON数据
    const todoData = req.body;

    // 查询字符串参数
    // const todoId = req.query.id;
    // const Todo_name = req.query.Todo_name || "";
    // const Todo_state = req.query.Todo_state || "";

    // 登录接口
    if(method === "POST" && req.path === "/api/Todo/login"){
        const loginDataPromise = login(todoData); // 返回的是promise对象
        return loginDataPromise.then((_data)=>{
            if(_data.length !== 0){
                // 封装token令牌
                const token = jwt.sign({
                    'User_id' : _data[0].User_id,
                    'User_name':_data[0].User_name,
                    'User_password':_data[0].User_password,
                    'time': Date.now(),
                },TOKEN_SECRET_CONFIG);
                const UserData = {
                    User_id : _data[0].User_id,
                    User_name : _data[0].User_name,
                    User_TOKEN : token
                }
                setTokenInDB(_data[0].User_id,token);
                return new successModel(UserData);
            }
            else{
                // 返回空数组数据，前端判空处理
                return new ErrorModel(_data);
            }
        });
    }

    // 获取用户信息
    if(method === "GET" && req.path === "/api/Todo/getUserInfo"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,data)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const userDataPromise = getUserInfo(data); // 返回的是promise对象
                return userDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }

    // 退出登录
    if(method === "POST" && req.path === "/api/Todo/userLogout"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,data)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const userDataPromise = userLogout(data); // 返回的是promise对象
                return userDataPromise.then(()=>{
                    const UserData = {
                        User_TOKEN : ''
                    }
                    return new successModel(UserData);
                });
            }
        });
    }

    // 获取该用户所有待办列表
    if(method === "POST" && req.path === "/api/Todo/getTodoList"){
        // 从前端获取token解析再从数据库里面根据解析的数据获取对应用户的数据
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const todoDataPromise = getTodoList(userData,todoData); // 返回的是promise对象
                return todoDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
        
    }

    // 获取该用户所有已完成列表
    if(method === "GET" && req.path === "/api/Todo/getFinishedList"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,data)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const finishedDataPromise = getFinishedList(data); // 返回的是promise对象
                return finishedDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }

    // 添加待办
    if(method === "POST" && req.path === "/api/Todo/addTodo"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const addTodoDataPromise = addTodoData(userData,todoData); // 返回的是promise对象
                return addTodoDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }

    // 删除待办
    if(method === "POST" && req.path === "/api/Todo/deleteTodo"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const deleteTodoDataPromise = deleteTodoData(todoData); // 返回的是promise对象
                return deleteTodoDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }
    
    // 更新待办状态(变为已完成)
    if(method === "POST" && req.path === "/api/Todo/updateState"){

        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const updateStatePromise = updateState(todoData); // 返回的是promise对象
                return updateStatePromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }

    // 获取概览数据
    if(method === "GET" && req.path === "/api/Todo/getTodayOverviewData"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const todayOverviewDataPromise = getTodayOverviewData(userData); // 返回的是promise对象
                return todayOverviewDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }

    //获取待办程度概览
    if(method === "GET" && req.path === "/api/Todo/getStateOverviewData"){
        const USER_TOKEN = req.headers.authorization;
        return jwt.verify(USER_TOKEN,TOKEN_SECRET_CONFIG,(err,userData)=>{
            if(err){
                console.log(err); //invalid signature
            }
            else{
                const stateOverviewDataPromise = getStateOverviewData(userData); // 返回的是promise对象
                return stateOverviewDataPromise.then((_todoData)=>{
                    return new successModel(_todoData);
                });
            }
        });
    }
    
}

module.exports = handleTodoRoute;
