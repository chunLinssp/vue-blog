<template>
  <el-container class="summary-container">
    <div style="width: 100%;height: 80px;padding-top: 1%;background: #c88326">
      <topTip class="top-sty" :tagName="tagName"></topTip>
    </div>
        <articles-show class="a-show" :article="summarys" ></articles-show>
  </el-container>
</template>

<script>
  import topTip from '@/components/TopTip';
  import Index from "@/views/summary/SummaryView";
  import {getArticleSummaryByTagId} from '@/api/tag'

    export default {
        name: "TagSummary",
      components:{
          topTip:topTip,
        articlesShow:Index
      },
      data(){
          return{
            summarys:[],
            tagName:''
          }
      },
      created() {
        let that = this;
        let id = this.$route.params.id;
        this.tagName = this.$route.params.tagName;
        getArticleSummaryByTagId(id).then(res => {
          console.log(res.data);
          that.summarys = res.data.data;
        })
      }
    }
</script>

<style scoped>

  .top-sty{
    width: 100%;
    height: 80px;
  }

  .a-show{
    position: absolute;
     margin-left: 10%;
    margin-top: 10%;
    width: 80%;
    margin-right: 10%;
  }

  .summary-container{
    position: absolute;
    top:17%;
    left: 0%;
    width: 100%;
    height:100%;
    border-radius:30px;
  }
  .summary-wrap{
    position: absolute;
    left: 0%;
    padding-top: 80px;
    width: 100%;
    height: 100%;
  }
  .summary-content{
    margin-left: 5%;
    padding-left:5%;
    margin-right: 5%;
    padding-right:5%;
    width: 80%;
    height: 100%;
  }
</style>
