<!--
 * @Description: 我的待办
 * @Author: MorantJY
 * @Date: 2022-02-16 21:57:07
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 14:31:16
-->

<template>
  <div class="dashboard-container">
      <div id="top">
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-input
                placeholder="请输入您要搜索的待办事项"
                v-model="searchTodoText"
                size="small"
                clearable>
                </el-input>
                </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple-light">
                <el-button type="primary" @click="searchTodoItemByParams" round size="small">搜索</el-button>
                </div></el-col>
          </el-row>
      </div>
      <div id="bottom">
        <div id="left">
            <div id="addTodo">
                <el-row>
                    <el-col :span="12"><div class="my-grid-content-left bg-purple">我的待办</div></el-col>
                    <el-col :span="12"><div class="my-grid-content-right bg-purple-light">
                        <el-button type="primary" @click="handleOpen" style="width:120px" round size="small">新建待办</el-button>
                        </div></el-col>
                </el-row>
                <hr>
            </div>
            
            <div id="todo">
                <el-table
                    :data="todoList"
                    style="width: 100%"
                    height="420"
                    :key="todoList.Todo_id"
                    border
                    stripe:true
                    >
                    <el-table-column
                    prop="Todo_createTime"
                    label="日期"
                    header-align="center"
                    width="100"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="Todo_name"
                    label="待办事项"
                    header-align="center"
                    width="auto">
                    </el-table-column>

                    <el-table-column
                    prop="Todo_typeId"
                    label="类型"
                    header-align="center"
                    width="70"
                    align="center">
                    <template slot-scope="{row}">
                        <el-tag :type="row.Todo_typeId | statusFilter">
                            {{ row.Todo_typeId }}
                        </el-tag>
                    </template>
                    </el-table-column>

                    <el-table-column
                    label="操作"
                    header-align="center"
                    width="120"
                    align="center">
                    <template slot-scope="scope">
                    <template>
                    <el-button type="success" size="small" icon="el-icon-check" circle @click="completeTodo(scope.row)"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" circle @click="deleteTodo(scope.row)"></el-button>
                    </template>
                </template>
                    
                    </el-table-column>
                </el-table>
                
            </div>
            <div id="addTodo">
                <el-row>
                    <el-col :span="24">
                        <div class="my-grid-content-left my-grid-content-finished bg-purple">已完成</div>
                    </el-col>
                </el-row>
            </div>
            <div id="finished">
                <el-table
                    :data="finishedList"
                    style="width: 100%"
                    height="420"
                    border
                    stripe:true
                    >
                    <el-table-column
                    prop="Todo_createTime"
                    label="日期"
                    header-align="center"
                    width="100"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="Todo_name"
                    label="已完成"
                    header-align="center"
                    width="auto">
                    </el-table-column>
                    <el-table-column
                    prop="Todo_typeId"
                    label="类型"
                    header-align="center"
                    width="70"
                    align="center">
                    <template slot-scope="{row}">
                        <el-tag :type="row.Todo_typeId | statusFilter">
                            {{ row.Todo_typeId }}
                        </el-tag>
                    </template>
                    </el-table-column>
                </el-table>
                
            </div>
        </div>
        <div id="right">
            <div id="description">概览</div>
            <div id="todayOverview"></div>
            <div id="stateOverview">待办情况</div>
        </div>
      </div>
      <el-drawer
        size="45%"
        title="添加待办"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <div id="form">
            <el-form :model="addTodoForm" :rules="rules" ref="addTodoForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="待办事项" prop="todoName">
                <el-input type="textarea" v-model="addTodoForm.todoName"></el-input>
            </el-form-item>
            <el-form-item label="待办类型" prop="type">
                <el-radio-group v-model="addTodoForm.type">
                <el-radio label="紧急"></el-radio>
                <el-radio label="重要"></el-radio>
                <el-radio label="一般"></el-radio>
                <el-radio label="普通"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" style="width:90px" @click="submitForm('ruleForm')">提交</el-button>
                <el-button size="small" style="width:90px" @click="resetForm('addTodoForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
      </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getTodoList,
  getFinishedList,
  addTodo,
  deleteTodo,
  updateState,

  getTodayOverviewData,
  getStateOverviewData
  
} from "@/api/todo";
import * as echarts from 'echarts'
import moment from 'moment'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){
      this._getTodoList();
      this._getFinishedList();
  },
  mounted(){
      this.initTodayOverviewCharts();
      this.initStateOverviewCharts();
  },
  filters: {
    //过滤状态
    statusFilter(status) {
      const statusMap = {
        紧急: 'danger',
        重要: 'warning',
        一般: 'success',
        普通: 'info'
      }
      return statusMap[status]
    }
  },
  data(){
      return {
        // 待办列表数组
        todoList : [],
        //已完成列表数组
        finishedList: [],
        //搜索框
        searchTodoText: '',
        // 添加待办弹出框状态
        drawer: false,
        //弹出框方向
        direction: 'rtl',
        //添加待办表单数据
        addTodoForm: {
          todoName: '',
          type: 0,
        },
        //待办表单校验规则
        rules: {
          todoName: [
            { required: true, message: '请填写待办事项', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择待办类型', trigger: 'change' }
          ],
        },
        //状态标签
        stateTag:''
      }
  },
  methods:{
    //获取待办列表
    _getTodoList(){
        let params = {
            Todo_name : this.searchTodoText.trim()
        }
        getTodoList(params).then((res)=>{
        const formatData = [];
        res.data.forEach(element => {
            element.Todo_createTime = moment(Number(element.Todo_createTime)).format('YYYY-MM-DD HH:MM');
            if(element.Todo_typeId == '1'){
                element.Todo_typeId = '紧急';
            }
            if(element.Todo_typeId == '2'){
                element.Todo_typeId = '重要';
            }
            if(element.Todo_typeId == '3'){
                element.Todo_typeId = '一般';
            }
            if(element.Todo_typeId == '4'){
                element.Todo_typeId = '普通';
            }
            formatData.push(element);
        });
        this.todoList = formatData;
        })
    },
    //获取已完成列表
    _getFinishedList(){
        getFinishedList().then((res)=>{
        const formatData = [];
        res.data.forEach(element => {
            element.Todo_createTime = moment(Number(element.Todo_createTime)).format('YYYY-MM-DD HH:MM');
            if(element.Todo_typeId == '1'){
                element.Todo_typeId = '紧急';
            }
            if(element.Todo_typeId == '2'){
                element.Todo_typeId = '重要';
            }
            if(element.Todo_typeId == '3'){
                element.Todo_typeId = '一般';
            }
            if(element.Todo_typeId == '4'){
                element.Todo_typeId = '普通';
            }
            formatData.push(element);
        });
        this.finishedList = formatData;
        })
    },
    //今日概览图表
    initTodayOverviewCharts(){
        getTodayOverviewData().then((res)=>{
            let dataArr = new Array();
            let dataView = {
                value:0,
                name:''
            };
            res.data.forEach(element => {
                if(element.state == 'true'){
                    dataView.name = '已完成';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                    // push完重置对象
                    dataView = {
                        value:0,
                        name:''
                    };
                }
                if(element.state == "false"){
                    dataView.name = '未完成';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                }
                
            });
            let chartDom = document.getElementById('todayOverview');
            let myChart = echarts.init(chartDom);
            let option;
            
            option = {
                title: {
                    text: '待办概览',
                    subtext: '未完成/已完成',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    name: '概览',
                    type: 'pie',
                    radius: '50%',
                    data: dataArr,
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };
            option && myChart.setOption(option);
        });
    },
    // 状态概览
    initStateOverviewCharts(){
        getStateOverviewData().then((res)=>{
            let dataArr = new Array();
            let dataView = {
                value:0,
                name:''
            };
            res.data.forEach(element => {
                if(element.type == 1){
                    dataView.name = '紧急';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                    // push完重置对象
                    dataView = {
                        value:0,
                        name:''
                    };
                }
                if(element.type == 2){
                    dataView.name = '重要';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                    // push完重置对象
                    dataView = {
                        value:0,
                        name:''
                    };
                }
                if(element.type == 3){
                    dataView.name = '一般';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                    // push完重置对象
                    dataView = {
                        value:0,
                        name:''
                    };
                }
                if(element.type == 4){
                    dataView.name = '普通';
                    dataView.value = element.value;
                    dataArr.push(dataView);
                    // push完重置对象
                    dataView = {
                        value:0,
                        name:''
                    };
                }
                
            });
            var chartDom = document.getElementById('stateOverview');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: '待办状态',
                    left: 'center'
                },
                
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                label: {
                    show: false
                },
                toolbox: {
                        show: true,
                        feature: {
                        mark: { show: true },
                    }
                },
                series: [
                    {
                    name: '待办状态分布',
                    type: 'pie',
                    radius: [15, 90],
                    center: ['55%', '60%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                        show: true
                        }
                    },
                    data: dataArr
                    }
                ],
                // 手动设置分块颜色
                color:['#ee6666','#fac858','#5470c6','#91cc75']
            };
            option && myChart.setOption(option);
        })

        
    },
    // 打开添加待办
    handleOpen(){
        this.drawer = true;
    },
    // 关闭添加待办
    handleClose() {
        this.$confirm('确认关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
        }).then(() => {
            this.drawer = false;
        }).catch(() => {
        this.$message({
            type: 'info',
            message: '请继续完善待办信息'
        });
        });
    },
    //添加待办
    submitForm() {
        let dataForm = {
            Todo_name:'',
            Todo_createTime:Date.parse(new Date()).toString(),//时间戳
            Todo_state:'false',
            Todo_typeId:0
        }
        if(this.addTodoForm.type=='紧急'){
            dataForm.Todo_typeId = 1;
        }
        else if(this.addTodoForm.type=='重要'){
            dataForm.Todo_typeId = 2;
        }
        else if(this.addTodoForm.type=='一般'){
            dataForm.Todo_typeId = 3;
        }
        else if(this.addTodoForm.type=='普通'){
            dataForm.Todo_typeId = 4;
        }
        dataForm.Todo_name = this.addTodoForm.todoName;
        if(dataForm.Todo_name && dataForm.Todo_typeId){
            addTodo(dataForm).then((res)=>{
            if(res.data.affectedRows){
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
                this.resetForm();
                this.drawer = false;
                this._getTodoList();
                this.initTodayOverviewCharts();
                this.initStateOverviewCharts();
            }
            else{
                this.$message({
                    message: '添加失败',
                    type: 'warning'
                });
            }
            }).catch((err)=>{
                console.log(err);
                this.$message.error('系统错误,请联系管理员');
            });
        }
        else{
            this.$message({
                message: '请完善您所要添加的待办信息后再提交！',
                type: 'warning'
            });
        }
        
    },
    //重置添加待办表单数据
    resetForm() {
        this.addTodoForm.todoName = '';
        this.addTodoForm.type = 0;
    },
    //删除待办
    deleteTodo(row){
        this.$confirm('此操作将删除该待办事项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTodo(row.Todo_id).then((res)=>{
              if(res.data.affectedRows){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this._getTodoList();
                this.initTodayOverviewCharts();
                this.initStateOverviewCharts();
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },  
    //搜索待办
    searchTodoItemByParams(){
        this._getTodoList();
    },
    //完成待办
    completeTodo(row){
        updateState(row.Todo_id).then((res)=>{
            if(res.data.affectedRows){
                this.$message({
                    type: 'success',
                    message: `"${row.Todo_name}"已完成`
                });
                this._getTodoList();
                this._getFinishedList();
                this.initTodayOverviewCharts();
            }
        })
    }  
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
    width: auto;
    height: 900px;
    margin: 10px;
    background-color: #eeeff4;
}

#top {
    width: auto;
    height: 45px;
    margin-bottom: 5px;
    line-height: 45px;
    border-radius: 15px;
    background-color: white;
}

#bottom {
    width: auto;
    height: 700px;
}

#left {
    width: 70%;
    height: 1000px;
    float: left;
    margin-bottom: 20px;
    background-color: #eeeff4;
}

#right {
    width: 30%;
    height: 1000px;
    float: right;
    margin-bottom: 20px;
    background-color: #eeeff4;

}

#addTodo {
    width: auto;
    height: 45px;
    margin-top: 5px;
}

#todo {
    width: auto;
    height: 440px; 
    padding: 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: white;
}

#finished {
    width: auto;
    height: 440px;
    margin-bottom: 10px;
    background-color: white;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

#description {
    width: auto;
    height: 45px;
    line-height: 45px;
    padding-left: 5px;
    font-size: 24px;
    color: #2a3a4a;
    background-color: #eeeff4;
}

#todayOverview {
    width: auto;
    height: 350px;
    margin: 5px;
    padding: 30px 10px 10px 10px;
    border-radius: 10px;
    background-color: white;
}

#stateOverview {
    width: auto;
    height: 300px;
    padding: 30px 10px 10px 10px;
    margin: 15px 5px;
    border-radius: 10px;
    background-color: white;
}

#form {
    margin: 10px 20px 10px 0px;
}

// ================ElementUI样式===================
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: white;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: white;
  }
  .grid-content {
    min-height: 45px;
    line-height: 45px;
    border-radius: 15px;
    text-align: center;
  }
  .my-grid-content-left {
    padding-left: 10px;
    min-height: 45px;
    line-height: 45px;
    text-align: left;
    border-top-left-radius: 15px;
    font-size: 24px;
    font-weight: 700;
    color: #2a3a4a;
  }
  .my-grid-content-right {
    padding-right: 5px;
    min-height: 45px;
    line-height: 45px;
    text-align: right;
    border-top-right-radius: 15px;
  }
  .my-grid-content-finished {
    padding-right: 5px;
    min-height: 45px;
    line-height: 45px;
    border-top-right-radius: 15px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }




</style>