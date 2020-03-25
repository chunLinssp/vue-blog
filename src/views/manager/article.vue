<template>
        <div>
            <div>
              <header1 :activeTags="tags" @msg="searchArticle($event)" ref="header"></header1>
            </div>

            <div class="body">
              <el-button @click="test"></el-button>
              <el-card class="box-card">
                <div class="article-card"  v-for="(item,index) in articles" :key="index">
                  <div >
                    <div style="display:inline-block;">
                      <img :src="item.articleAvatars[0].avatar" v-if="item.articleAvatars.length!=0">
                      <img v-else src="/static/category/back.png">
                    </div>
                    <div style="display:inline-block;float: right">
                      <div  class="title">
                        <a style="white-space: pre-wrap;">{{item.title}}</a>
                        <el-button type="primary" icon="el-icon-edit" circle style="float:right; " ></el-button>

                      </div>
                        <ul class="count">
                          <li><span style="float:left;">阅读量：{{item.viewCounts}}</span></li>
                          <li><span style="float:left;">评论量： {{item.commentCounts}}</span></li>
                        </ul>

                      <div class="create-sty">
                        <span>{{ item.createDate}} </span>
                        <el-button type="danger" icon="el-icon-delete" style="float:right;" circle="true" @click="deleteArticle(item.id)"></el-button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 2,3, 4]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageCount">
                  </el-pagination>
                </div>
              </el-card>

            </div>

        </div>

</template>

<script>
  import header from '@/views/manager/card/articleHeader'
  import body from '@/views/manager/card/articleBody'
    export default {
      components:{
        header1:header,
        body1:body,
      },
      created() {
          let that = this;
          let uid = this.$store.state.id;
          let param = new URLSearchParams();
          param.append("id",uid);
          this.$axios.get('/tags/findById?id='+uid).then(res=>{
            console.log(res.data.data);
            that.tags = res.data.data;
          });
          this.$axios.get('/articles/getAll',{
            params:{
              pageSize: that.pageSize,
                pageNumber: that.currentPage,
              name: 'a.createDate',
              sort: 'desc',
              id:uid
            }
          }).then(res=>{
            that.articles = res.data.data.content;
            that.pageCount = res.data.data.totalElements;
            console.log( that.articles);
          })
      },
      data(){
        return{
          pageCount:0,
          articles:null,
          currentPage:1,
          defaultImg:'',
          pageSize:1,
          tags:'1122'
        }
       },
      methods:{
        change(){
          this.num += 1;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          let that = this;
          let uid = this.$store.state.id;

          this.$axios.get('/articles/getAll',{
              params:{
                pageSize: that.pageSize,
                pageNumber: that.currentPage,
                name: 'a.createDate',
                sort: 'desc',
                id:uid
              }
          }).then(res=> {
            that.articles = res.data.data.content;
            that.pageCount = res.data.data.totalElements;

          })
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);

          this.currentPage = val;
          let numCount = this.pageSize;
          let that = this;
          let uid = this.$store.state.id;
          this.$axios.get('/articles/getAll',{
            params:{
              pageSize: numCount,
              pageNumber: that.currentPage,
              name: 'a.createDate',
              sort: 'desc',
              id:uid
            }
          }).then(res=> {
            that.articles = res.data.data.content;
            that.pageCount = res.data.data.totalElements;
            console.log( that.articles);
          })
        },
        test(){
          alert(this.$refs.header.msg);
        },
        searchArticle(data){
          alert(data);
          this.currentPage = 1;
          let that = this;
          let uid = this.$store.state.id;
          if(data[0] == ''){
            data[0] = '';
          }
          if(data[1] == ''){
            data[1] = '';
          }
          this.$axios.get('/articles/keywordSearch',{
            params:{
              pageSize: that.pageSize,
              pageNumber: that.currentPage,
              id:uid,
              name:data[2],
              preDate:data[0],
              laterDate:data[1]
            }
          }).then(res=>{
            that.pageCount = res.data.data.pageTotal;
            that.pageSize = res.data.data.pageSize;
            that.currentPage = res.data.data.pageNum;
            console.log(res.data);
            let jsonStr = JSON.stringify(res.data.obj);
            // console.log(res.data.data.obj);
            let tmp=[];
            for(var i = 0 ;i< res.data.data.obj.length;i++){
              tmp.push(res.data.data.obj[i]);
            }
            that.articles = tmp;
            console.log(that.articles);
          })
        },
        deleteArticle(aid){
          let uid = this.$store.state.id;
          let formData = new FormData();
          formData.append("uid",uid);
          formData.append("articleId",aid);
          this.$axios.delete('/articles/deleteOne',{
            data:{
              'uid': uid,
              'articleId':aid
            }

          }).then(res=>{
            console.log(res.data);
            if(res.data.code = 0){
              $.message('成功删除!');
              that.handleSizeChange(that.pageSize);
            }
          })
        }

      }

    }
</script>

<style scoped>
  .header-sty{
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

  .body{
    width: 800px;
    height: auto;
    position: absolute;
    margin: auto;
    top:180px;
    left: 0;
    right: 0;
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
    width: 800px;
    height: auto;
  }
  .hr-sty{
    width:80%;
    margin:0 auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-left: 120px;
    margin-right: 50px;
  }
  .article-card{
    padding: 24px 0;
    line-height: 1;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #d8d8d8;
    position: relative;
  }
  .count{
    display: inline-block;
    margin: 0;

  }
  li{
    position: relative;
    display: inline-block;
    heigth : 30px;
    margin-top: 20px;
    padding: 0px;
  }
  img{
    width: 100%;
    min-height: 100%;
    -webkit-transition: all .5s ease-out .1s;
    -moz-transition: all .5s ease-out .1s;
    transition: all .5s ease-out .1s;
    width:200px;
    height:130px;
  }
  .title{
    font-size: 16px;
    width: 480px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.5;
    display: block;
  }
  a{
    color: #222
  }
  .create-sty{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin-top: 25px;
  }
</style>
