/*
 * @Description: 规范数据返回格式
 * @Author: MorantJY
 * @Date: 2022-02-11 23:40:23
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-12 00:03:34
 */

class BaseMode{
    constructor(data,message){
        if(typeof data === "string"){
            this.message = data;
            data = null;
            message = null;
        }

        if(data){
            this.data = data;
        }

        if(message){
            this.message = message;
        }
    }
}

class successModel extends BaseMode{
    constructor(data,message){
        super(data,message);
        this.errorNumber = 0;
    }
}

class ErrorModel extends BaseMode{
    constructor(data,message){
        super(data,message);
        this.errorNumber = -1;
    }
}


module.exports = {
    successModel,
    ErrorModel
}