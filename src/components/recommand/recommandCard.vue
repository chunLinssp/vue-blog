<template>
  <Affix :offset-top="50" @on-change="change">
    <el-card class="box-card">
      <section class="_3Z3nHf">
        <h3 class="QHRnq8 QxT4hD">
          推荐阅读
        </h3>
        <div class="_3L5YSq">
          <div v-for="(rec,index) in recData" :key="rec.id" class="_3L5YSq">
            <a class="_1-HJSV _1OhGeD"  @click="jumpToLook(rec.id)">
              {{rec.title}}
            </a>
            <el-divider></el-divider>
          </div>
        </div>
      </section>
    </el-card>

  </Affix>

</template>

<script>
    export default {
        name: "recommandCard",
      props:{
        recData:{
          type:Object
        }
      },
      methods:{
        jumpToLook(id) {
          this.$router.push('/article/'+id)
        }
      }
    }

</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .cuOxAY {
    margin-bottom: 12px;
  }
  a {
    color: #ec7259;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    -webkit-transition: color .3s;
    transition: color .3s;
    -webkit-text-decoration-skip: objects;
  }
  ._3L5YSq {
    text-align: left;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  ._1OhGeD, ._1OhGeD:active, ._1OhGeD:hover {
    color: inherit;
  }

  .box-card {
    width: 260px;
  }
  ._3Z3nHf {
    padding: 16px;
  }
  .QHRnq8 {
    font-size: 16px;
    padding-left: 6px;
    height: 18px;
  }
  .QxT4hD {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #ec7259;
    font-size: 18px;
    font-weight: 500;
    height: 20px;
    line-height: 20px;
  }
</style>
