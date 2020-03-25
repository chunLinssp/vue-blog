<template>
      <div class="main-inner">
        <section class="recommand-card">
          <div >
            <recommand-card :recData="recommandData"></recommand-card>
          </div>
        </section>

        <section class="content-wrap">
          <div class="content">
            <SummaryView :article="summarys" ></SummaryView>
            <div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync= currentPage
                :page-size=pageSize
                layout="prev, pager, next, jumper"
                :total=totalSize>
              </el-pagination>
            </div>
            <footer class="post-eof">
            </footer>
          </div>
        </section>

        </div>
</template>

<script>
  import recommandCard from "../components/recommand/recommandCard";
  import {getRecommandTitle,getArticleSummary} from "@/api/article";
  import SummaryView from '../views/summary/SummaryView';

  export default {
        name: "Index",
      components:{
          recommandCard:recommandCard,
        SummaryView:SummaryView
      },
      data(){
          return{
            currentPage:1,
            pageSize : 5,
            totalSize: 0,
            pageVo :{
              pageNumber:1,
              pageSize:5,
              sort:'DESC',
              name:'page'
            },
            summarys:[],
            recommandData:[]
          }
      },
      created() {

        let that = this;
        getArticleSummary(that.pageVo).then(res =>{
          that.totalSize = res.data.pageTotal;
          that.summarys = res.data.data;
          console.log(that.summarys);
        });

        getRecommandTitle().then(res=>{
          console.log(res.data);
          that.recommandData = res.data;
        })

      },
      methods:{
        categoryLook(id){
          this.$router.push('/article/'+id)
        },
        handleCurrentChange(current){
          if(current >1)
                current = parseInt(this.pageSize * parseInt(current-1));
          console.log(this.pageSize);
          let pageVo ={
            pageNumber:current,
            pageSize:this.pageSize,
            sort:'DESC',
            name:'page'
          }

          console.log(pageVo);
          let that = this;
          getArticleSummary(pageVo).then(res =>{
              that.totalSize = res.data.pageTotal;
            that.summarys = res.data.data;
          });

          window.scroll(0,0);
        }
     }
    }
</script>

<style scoped>

  .container{
  }
  .main-inner {
     position: absolute;
    top:20%;
     width: 100%;
    height: 100%;

   }
  .recommand-card{
    width: 30%;
    display: inline-block;
    float: right;
  }

  /*.main-inner {*/
  /*  margin:0 auto;*/
  /*  position: absolute;*/
  /*  left: 40%;*/
  /*  margin: 300px auto;*/
  /*}*/

  .content-wrap{
    padding-left: 20%;
    padding-right: 30%;
    margin-left: -50px;
  }
  .post-eof {
    background: #ccc;
    height: 1px;
    margin: 80px auto 60px;
    text-align: center;
    width: 8%;
  }

  a{
    border-bottom: 1px solid #999;
    color: #555;
    outline: 0;
    text-decoration: none;
    overflow-wrap: break-word;
    word-wrap: break-word;
    cursor: pointer;
    font-size: 23px;
  }
</style>
