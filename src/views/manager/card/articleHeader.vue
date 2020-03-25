<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix"  >
        <ul v-for="(item,index) in activeTags" :key="index">
          <li>
            <el-tag type="success" @click="clicked"  >
              {{item.tagname}}
            </el-tag>
          </li>
        </ul>

      </div>
      <div>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <div class="search-desktop">
            <div class="input-desktop">
              <div class="input-desktop">
                <el-input v-model="msg" placeholder="请输入内容" class="input"></el-input>
              </div>
              <div style="display: inline-block;" >
                <el-button icon="el-icon-search" circle style="display: inline-block; " @click="search"></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>


</template>

<script>

  export default {
    props:{
      activeTags :{
        type:String
      }
    },
    data(){
      return {
        tags:'',
        value2:'',
        msg:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created() {

    },
    methods:{
      clicked(){
        alert(this.value2);
      },
      search(){
        let pre='';
        let later='';
        if(this.value2[0]!=null){
           pre = this.dateFormat("YYYY-mm-dd",this.value2[0]);
        }
        if(this.value2[1]!=null){
           later = this.dateFormat("YYYY-mm-dd",this.value2[1]);
        }
        let params = [];
        params.push(pre);
        params.push(later);
        params.push(this.msg);
         this.$emit("msg",params);
      },
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
        };
        return fmt;
      }
    }

  }

</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";

  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    background-color: #fff;
    border-radius: 5px;
    width: 800px;
    height: 150px;
    position: absolute;
    margin: auto;
    top:100px;
    left: 0;
    right: 0;
  }
  .btn-group{
    display:inline-block;
    position: relative;
    vertical-align:middle;
    border:5px solid #ccc;
  }

  .btn-group input,.btn-group button{
    padding:0;
    margin:0;
  }
  .btn-group .input{
    display:inline-block;
    height:30px;
    float:left;
    border:none;
    outline:none;
  }
  .btn-group .btn{
    display:inline-block;
    font-size:15px;
    height:30px;
    float:left
  }
  .input-desktop{
    display:inline-block;
  }
  .search-desktop{
    display:inline-block;
    float: right;
  }
  li{
    list-style:none; /* 将默认的列表符号去掉 */
    padding-left:5px ; /* 将默认的内边距去掉 */
    margin:0; /* 将默认的外边距去掉 */
    float: left; /* 往左浮动 */
    display: block;
  }


</style>
