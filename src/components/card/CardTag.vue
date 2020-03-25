<template>
  <div class="container">
    <el-container>
      <el-main>
        <div style="width: 800px">
          <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="(item,index) in tags" :key="item.id" >
              <div>
                <Card style="width:320px;display: inline">
                  <div style="text-align:center">
                    <img :src="item.avatar" @click="goTags(item.id,item.tagname)">
                    <span >{{item.tagname}}</span>
                  </div>
                </Card>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="background:#eee;padding: 20px">
          <Card :bordered="false">
            <p slot="title">点击小卡片快速浏览</p>
            <Tag color="cyan" v-for="(item,index) in tipTags" :key="item.id">
              <a @click="goTags(item.id,item.tagname)">{{item.tagname}}</a>
            </Tag>
          </Card>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import {getArticleSummaryByTagId,listHotTags,findAll} from '@/api/tag'
  export default {
    created() {
      let that = this;
      listHotTags().then(res =>{
        console.log(res.data);
        that.tags = res.data;
      })

      findAll().then(res =>{
        console.log(res.data);
        that.tipTags = res.data;
      })
    },
    data() {
      return {
        value2: false,
        value3: 0,
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'inside',
          radiusDot: false,
          trigger: 'click',
          arrow: 'hover'
        },
        tags:[],
        tipTags:[]
      }
    },
    methods:{
      change(){
        this.$router.push('/');
      },
      goTags(id,name){
        this.$router.push('/article/tagTmp/all/'+id+ '/'+name);
      }
    }
  }
</script>
<style>

  .div-content{
    top:50%;
    padding-top: 1000px;
  }

  .container{
    margin-top: 250px;
    position:absolute;
    top:30%;
    left:50%;
    transform: translate(-50%,-50%);//通过变形来搞定
    margin-top: 10px;
  }

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
    width: 480px;
  }
</style>
