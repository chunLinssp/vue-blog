<template>
  <div style="width:100%;height:30px">
    <img src="@/assets/logo.png" style="width:100%;height:30px" >
    <el-card>
      <div class="searchBar" id="searchBar">
        <ul :class="searchBarFixed == true ? 'isFixed' :''">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/CardTag/all">标签</router-link>
          </li>
          <li>
            <router-link to="/CardCategory/all">分类</router-link>
          </li>
          <li>
            <router-link to="/archives/:year?/:month?"> 归档</router-link>
          </li>
          <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-if="user.login">
                  <el-dropdown-item>
                    <a @click="AboutMe()">我的</a></el-dropdown-item>
                  <el-dropdown-item  >
                    <a @click="goToWrite()">创作</a></el-dropdown-item>
                  <el-dropdown-item >设置</el-dropdown-item>
                  <el-dropdown-item >
                    <a @click="loginOut()">退出登录</a></el-dropdown-item>
                  <el-dropdown-item >
                    <a @click="registerUser()">注册</a></el-dropdown-item>
                </template>
                <template v-else>
                    <el-dropdown-item>
                      <a @click="loginPlay()">登录</a></el-dropdown-item>
                    <el-dropdown-item >
                      <a @click="registerUser()">注册</a></el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </el-card>

  </div>
</template>

<script>
  import store from '@/store'
  import {logout} from '@/api/login'
    export default {
        name: "BaseSide",
        mounted () {
              window.addEventListener('scroll', this.handleScroll)
        },
        computed:{
          user(){
            let login = this.$store.state.account.length != 0;
            let avatar = this.$store.state.avatar;
            return{
              login,avatar
            }
        }
        },
        data(){
            return{
              searchBarFixed:true
            }
        },
        methods: {
        change (status) {
          this.$Message.info(`Status: ${status}`);
        },
          handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let offsetTop = document.querySelector('#searchBar').offsetTop
            scrollTop > offsetTop ? this.searchBarFixed = true : this.searchBarFixed = false
          },
          registerUser(){
            this.$router.push('/register');
          },
          goToWrite(){
          let id = this.$store.state.account;
          alert(id);
          // alert(id);
            this.$router.push('/write/'+id)
          },
          loginOut(){
          let that = this;
          this.$store.dispatch('logout').then(()=>{
              that.$router.push('/');
          })

          },
          loginPlay(){
            this.$router.push('/logins');
          },
          AboutMe(){
           this.$router.push('/myData');
          }
      }
    }
</script>

<style>
  a{
    color: #333;
  }

  .box-card1 {
    WIDTH:50%;
  }
</style>
<style  lang="less" type="text/less">
  .searchBar{
    .isFixed{
      position:fixed;
      background-color:#Fff;
      top:0;
      WIDTH:100%;
      z-index:999;
    }
    ul {
      WIDTH:100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      list-style: none ;
      li {
        font-size: 0.8rem;
        text-align: center;
        flex: 1;
        i {
          font-size: 0.9rem;
          padding-left: 5px;
          color: #ccc;
        }
      }
      border-bottom: 1px solid #ddd;
    }
  }
</style>
