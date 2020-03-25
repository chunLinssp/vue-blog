<template>
  <div class="category-div" :style="{'background':colorHex}">
    <el-container  class="category-wrap">
      <el-main  class="category-content" >
        <div class="category-content">
          <el-card class="box-card">
            <div v-for="(item,index) in treeData" :key="index" style="text-align: center;">
              <ul class="ui" >{{item.categoryName}}<br/>
                <li class="li-sty" v-for="(childs,ins) in item.tagMap " :key="ins+10">
                  <a @click="goTags(childs.id,childs.name)">{{childs.name}}</a></li>
              </ul>
              <br/><br/><br/>
            </div>


          </el-card>
        </div>
      </el-main>
    </el-container>
    <Button type="success" long @click="changeBackground()">SURPRISE</Button>
  </div>
</template>

<script>
   import {getAllCateTreeVo} from '@/api/category'
    export default {
        name: "CardCategory",
      created() {
          let that = this;
          getAllCateTreeVo().then(res=>{
            that.treeData = res.data;
            console.log( that.treeData);
          })
      },
      data(){
          return{
            colorHex: '',
            treeData:[
            ],
            data1: [
              {
                title: 'parent 1',
                expand: true,
                children: [
                  {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-2-1'
                      },
                      {
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          }
      },
      methods:{
        changeBackground(){
          var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
          while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
          }
          this.colorHex = '#' + hex
        },
        goTags(id,name){
          this.$router.push('/article/tagTmp/all/'+id+ '/'+name);
        }
      }

    }
</script>

<style scoped>
  .category-div{
    position: absolute;
    top:20%;
    left: 25%;
    width: 50%;
    height:50%;
    border-radius:30px;
  }
  .category-wrap{
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
  .category-content{
    top:0%;
    width: 100%;
    height: 100%;
    padding-left: 100px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .ui{
    /*list-style: none;*/
    margin:0;
    padding:0;
    text-align: center;
  }

   .li-sty a{
    /*width:70px;*/
    /*height:50px;*/
    /*padding:0 20px;*/
    /*font-size: 12px;*/
    /*line-height:50px;*/
    display: inline-block;
  }
  .li-sty{
    /*width:70px;*/
    /*margin:0 10px;*/
    float: right;/*该处换为display:inline-block;同样效果*/
    padding-left: 50px;
    margin-left: 20px;
  }
</style>
