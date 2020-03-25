<template>
    <el-container>
      <base-side :activeIndex = "activeIndex"></base-side>
          <router-view></router-view>
<!--      <div id="v-content" v-bind:style="{minHeight: Height+'px'}"><router-view /></div>-->
      <base-footer v-show="footerShow"></base-footer>
    </el-container>
</template>

<script>
import BaseFooter from "./components/BaseFooter";
import BaseSide from "./views/BaseSide";
    export default {
        name: "Home",
      components:{
          "base-side":BaseSide,
        "base-footer":BaseFooter
      },
      mounted(){
          //动态设置内容高度 让footer始终居底   header+footer的高度是100
          this.Height = document.documentElement.clientHeight - 100;
          //监听浏览器窗口变化　
          window.onresize = ()=> {this.Height = document.documentElement.clientHeight -100}
      },
      data(){
          return{
            Height: 0,
            activeIndex:'/',
            footerShow:true
          }
      }
    }
</script>

<style scoped>


</style>
