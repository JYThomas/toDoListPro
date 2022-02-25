<!--
 * @Description: 工作台总览页
 * @Author: MorantJY
 * @Date: 2022-02-16 13:24:40
 * @LastEditors: MorantJY
 * @LastEditTime: 2022-02-25 17:10:11
-->
<template>
  <div class="dashboard-container">
    <div id="top">
      <div id="UserInfo">
          <div id="left">
            <div id="leftTop">您好:{{name}}</div>
            <div id="leftBottom">
              <span>今天是:{{value}}</span>
            </div>
          </div>
          <div id="right">
            <clock></clock>
          </div>
      </div>
      <div id="totalOverview">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <div class="cardIcons"><img src="@/icons/svg/今日待办.png" alt="今日待办"></div>  
            <div class="cardDesc">
              <span style="margin-bottom:10px;display:block;">今日待办</span>
              <span>{{this.overviewData.todayTodo}}</span>  
            </div>  
          </div></el-col>
           <el-col :span="12"><div class="grid-content bg-purple">
            <div class="cardIcons"><img src="@/icons/svg/今日完成.png" alt="今日完成"></div>  
            <div class="cardDesc">
              <span style="margin-bottom:10px;display:block;">今日完成</span>
              <span>{{this.overviewData.todayFinished}}</span>  
            </div>  
          </div></el-col>
        </el-row>
        <el-row>
           <el-col :span="12"><div class="grid-content bg-purple">
            <div class="cardIcons"><img src="@/icons/svg/累计待办.png" alt="累计待办"></div>  
            <div class="cardDesc">
              <span style="margin-bottom:10px;display:block;">累计待办</span>
              <span>{{this.overviewData.cumulativeTodo}}</span>  
            </div>  
          </div></el-col>
           <el-col :span="12"><div class="grid-content bg-purple">
            <div class="cardIcons"><img src="@/icons/svg/累计完成.png" alt="累计完成"></div>  
            <div class="cardDesc">
              <span style="margin-bottom:10px;display:block;">累计完成</span>
              <span>{{this.overviewData.cumulativeFinished}}</span>  
            </div>  
          </div></el-col>
        </el-row>
      </div>
    </div>

    <div id="stateStatistics"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Clock from 'vue-clock2';
import moment from 'moment';
import * as echarts from 'echarts';

import {
  getOverviewStatistics,
  getStateStatistics
} from "@/api/dashBoard";

export default {
  components: { Clock },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
    this.getStateFullYearOverview();
  },
  created(){
    this.getOverviewData();
  },
  data(){
    return {
      value: moment(new Date()).format('yyyy年MM月DD日'),
      overviewData:{
        todayTodo:0,
        todayFinished:0,
        cumulativeTodo:0,
        cumulativeFinished:0
      },
      stateOverviewData:{
          emergency:[],
          important:[],
          general:[],
          ordinary:[]
      }
    }
  },
  methods:{
    // 获取待办统计数据
    getOverviewData(){
      getOverviewStatistics().then((res)=>{
        this.overviewData.todayTodo = res.data.todayTodo;
        this.overviewData.todayFinished = res.data.todayFinished;
        this.overviewData.cumulativeTodo = res.data.cumulativeTodo;
        this.overviewData.cumulativeFinished = res.data.cumulativeFinished;
      })
    },
    // 获取全年待办程度预览
    getStateFullYearOverview(){
      getStateStatistics().then((res)=>{
        this.stateOverviewData = res.data;

        var chartDom = document.getElementById('stateStatistics');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          title: {
            text: '全年各月份待办类型统计',
            subtext: '年份:2022年',
            left: 'center'
          },
          legend: {
            orient: 'vertical',
            left: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月',
              ]
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '紧急',
              type: 'bar',
              barWidth: 13,
              // stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: this.stateOverviewData.emergency
            },
            
            {
              name: '重要',
              type: 'bar',
              barWidth: 13,
              // stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: this.stateOverviewData.important
            },
            {
              name: '一般',
              type: 'bar',
              barWidth: 13,
              // stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: this.stateOverviewData.general
            },
            {
              name: '普通',
              type: 'bar',
              barWidth: 13,
              // stack: 'Search Engine',
              emphasis: {
                focus: 'series'
              },
              data: this.stateOverviewData.ordinary
            }
          ]
        };

        option && myChart.setOption(option);
      });
      

    },
  }
}
</script>

<style lang="scss" scoped>
// 连接起来拼凑的css样式
.dashboard {
  &-container {
    margin: 25px;
  }
}

img {
  width: 80px;
  height: 80px;
}

#top {
  width: auto;
  height: 300px;
  background-color: #eff1f4;
  margin-bottom: 15px;
}

#UserInfo{
  width: 50%;
  height: 300px;
  float: left;
  border-radius: 15px;
  background-color: #FFFFFF;
  color: #2a3a4a;
}

#left {
  float: left;
  padding: 30px 5px 20px 20px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
  font-size: 25px;
  font-weight: 700;
}

#leftTop {
  width: 150px;
  margin: 50px 0px 0px 60px;
}

#leftBottom {
  width: auto;
  margin: 30px 5px;
}

#right {
  
  float: right;
  margin: 50px 35px 10px 0px;
}

.cardIcons {
  width: 80px;
  height: 80px;
  float: left;
  color: #8c8c8c;
  margin: 15px 20px;
}

.cardDesc {
  width: 90px;
  height: 60px;
  float: right;
  background-color: white;
  margin: 25px 20px 25px 5px;
  text-align: center;
  padding: 8px 3px;
  color: #8c8c8c;
  font-size: 20px;
  font-weight: 700;
}

#totalOverview {
  width: 49%;
  height: 300px;
  background-color: #CCFFFF;
  float: right;
  padding: auto;
  border-radius: 15px;
}

#stateStatistics {
  margin-top: 30px;
  padding: 25px 15px;
  width: 100%;
  height: 500px;
  border-radius: 15px;
  background-color: white;
}


//=====================ElementUI 样式=====================
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
  background: #99a9bf;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 10px;
  width: 240px;
  height: 108px;
  margin: 15px auto;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>
