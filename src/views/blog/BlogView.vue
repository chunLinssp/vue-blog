<template>
  <el-container class="view-container">
    <el-main class="view-wrap">

        <Affix :offset-top="100" @on-change="change">
          <Card style="float: left;display: inline-block">
            <p slot="title">NickName</p>
              <a slot="title">{{articleData.author.nickname}}</a>
            <img :src="articleData.author.avatar">
          </Card>
        </Affix>


      <div style="background:#eee;padding: 20px" class="view-content">
        <Card :bordered="false">
          <h1 slot="title">{{articleData.title}}</h1>
          <p v-html="articleData.body.contentHtml">{{articleData.body.contentHtml}}</p>
        </Card>

      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {ArticleDetial} from '@/api/article'
    export default {
        name: "BlogView",
      data(){
          return{
              articleData:{}
          }
      },
      created() {
          console.log(this.$route.params.id)
          let ids = this.$route.params.id;
          let that = this;
          ArticleDetial(ids).then(res =>{
            console.log(res);
            that.articleData = res.data;
          })
      }
    }
</script>

<style scoped>
  a{
    color: #c88326;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h1{
    color: #404040;
    font-weight: 600;
    font-size: 30px;
    word-break: break-word;
    text-rendering: optimizelegibility;
  }

  img{
    width:60px;
  }

  .view-container{
    position: absolute;
    top:17%;
    left: 0%;
    width: 100%;
    height:auto;
    border-radius:30px;
  }
  .view-wrap{
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
  .view-content{
    margin-left: 10%;
    padding-left:20%;
    width: 80%;
    height: auto;
    padding-right: 150px;
    padding-top: 30px;
  }

</style>
