<template>
  <div class="archive-container">
    <el-container class="archive-wrap">
      <el-main>
        <div class="archive-content">
          <Timeline>
            <div v-for="(item,index) in archiveData" :key="item.id">
              <TimelineItem color="black" >
                <p class="time">{{item.newTime}}</p>
                <p class="content">
                  <a class="a-archive" @click="archiveToLook(item.id)"> {{item.summary}}</a>
                </p>
                <Divider />
              </TimelineItem>
            </div>
          </Timeline>
          <footer class="post-eof">
          </footer>
          <div >
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

      </el-main>

    </el-container>
  </div>

</template>

<script>
  import {listArchives} from '@/api/archives'
    export default {
        name: "CardTag",
      created() {
          let that = this;
        listArchives(this.pageVo).then(res =>{
          console.log(res.data);
          that.totalSize =  res.data.pageTotal;
          that.archiveData = res.data.data;
        })
      },
      data(){
          return{
            archive:[
              {
                id: '',
                title: '',
                yaer: '',
                month:''
              }
            ],
            currentPage:1,
            pageSize : 5,
            totalSize: 0,
            pageVo :{
              pageNumber:1,
              pageSize:5,
              sort:'DESC',
              name:'page'
            },
            archiveData:[]
          }
      },
      methods:{
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
          listArchives(pageVo).then(res =>{
            console.log(res.data);
            that.totalSize =  res.data.pageTotal;
            that.archiveData = res.data.data;
          });
          window.scroll(0,0);
        },
        archiveToLook(id){
          this.$router.push('/article/'+id);
        }
      }

    }
</script>

<style scoped>

  .a-archive{
    display: block;
    max-height: 44px;
    overflow: hidden;
    word-wrap: break-word;
    color: #333;
    cursor: pointer;
  }


  .archive-container{
    position: absolute;
    top:20%;
    left: 15%;
    width: 80%;
    height:100%;
    border-radius:30px;
  }
  .archive-wrap{
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
  .archive-content{
    width: 100%;
    height: auto;
    padding-left: 100px;
    padding-right: 150px;
    padding-top: 30px;
  }


  .div-modTop{
    position: absolute;
    top:30%;
    left: 40%;
    margin-left: -150px;
    height:700px;
    width: 30%;
  }

  .post-eof {
    background: #ccc;
    height: 1px;
    margin: 80px auto 60px;
    text-align: center;
    width: 8%;
  }
</style>
