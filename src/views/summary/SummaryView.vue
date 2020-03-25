<template>
      <div >
        <div class="content">
          <article v-for="(article,index) in article"  :key="article.id">
            <a @click="categoryLook(article.id)" >{{article.title}}</a>
            <div>
              <span>{{article.createDate}}</span>
              <span >{{article.categoryName}}</span>
              <br>
              <span>字数:{{article.numCounts}}</span>
              <span>浏览量:{{article.viewCount}}</span>
            </div>
            <div>
              {{article.summary}}
            </div>
            <footer class="post-eof">
            </footer>
          </article>
      </div>
  </div>
</template>

<script>
  import recommandCard from "@/components/recommand/recommandCard";
    export default {
        name: "SummaryView",
      props:{
        article:{
          type:Object
        }
      },
      methods:{
      categoryLook(id){
        this.$router.push('/article/'+id)
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

