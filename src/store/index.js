import Vuex from 'vuex'
import Vue from 'vue'
import {getToken,setToken,removeToken} from '@/requests/token'
import {login,getUserInfo,logout,register} from "@/api/login";

Vue.use(Vuex)


export default new Vuex.Store({

  state:{
    id:'',
    account:'',
    name:'',
    avatar:'',
    token:getToken(),
  },
  mutations:{
    SET_TOKEN:(state,token) =>{
      state.token = token;
    },
    SET_ACCOUNT:(state,account) =>{
      state.account = account
    },
    SET_AVATAR:(state,name) =>{
      state.name = name
    },
    SET_ID:(state,account) =>{
      state.account = account
    },
    SET_NAME:(state,name) =>{
      state.name = name
    }
  },
  actions:{
    login({commit},user){
      return new Promise((resolve,reject) =>{
        login(user.account,user.password).then(data=>{
            commit('SET_TOKEN',data.data['Oauth-Token'])
            setToken(data.data['Oauth-Token'])
            resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    },

    //获取用户信息
    getUserInfo({commit},state){
      return new Promise((resolve,reject) =>{
        getUserInfo().then(data =>{
          if(data.data){
            commit('SET_ACCOUNT',data.data.account);
            commit('SET_NAME',data.data.nickname);
            commit('SET_AVATAR',data.data.avatar);
            commit('SET_ID',data.data.id);
          }else{
            commit('SET_ACCOUNT','');
            commit('SET_NAME','');
            commit('SET_AVATAR','');
            commit('SET_ID','');
          }
            resolve();
        }).catch(error =>{
          reject(error);
        })
      })
    },

    //退出
    logout({commit},state){
      return new Promise((resolve,reject) =>{
        logout().then(data => {
          commit('SET_ACCOUNT', '');
          commit('SET_NAME', '');
          commit('SET_AVATAR', '');
          commit('SET_ID', '');
          commit('SET_TOKEN', '');
          resolve();
        }).catch(error =>{
          reject(error);
        })
      })
    },

    //前端登出
    fedLogOut({commit}){
      return new Promise((resolve) =>{
        commit('SET_ACCOUNT', '');
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');
        commit('SET_ID', '');
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      })
    },

    //注册
    register({commit},user){
      return new Promise(((resolve, reject) => {
        register(user.account,user.nickname,user.password).then((data) =>{
          commit('SET_TOKEN',data.data['Oauth-Token']);

          setToken(data.data['Oauth-Token'])
          resolve();
        }).catch((error) =>{
          reject(error);
        })
      }))
    }
  }
})



