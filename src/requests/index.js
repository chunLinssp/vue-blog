import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from "@/requests/token";
import qs from 'qs'

const service = axios.create({
  baseURL:process.env.BASE_API,
  timeout:50000
})

//request 拦截器
service.interceptors.request.use(config =>{

  if(store.state.token){
    config.headers['Oauth-Token'] = getToken();
}
  return config
}, error => {
  Promise.reject(error)
})

//reponse 拦截器
service.interceptors.response.use(response=>{
  if(response.headers['Oauth-Token'] == 'timeout'){
    store.dispatch('fedLogOut')
  }
  const res = response.data;
  if(res.code != 0){
    // 90001 Session 超时
    if(res.code == 90001){
      return Promise.reject('error');
    }
    //20001 用户未登录
    if(res.code == 20001){
      console.info('用户未登录');
      Message({
        type:'warning',
        showClose:true,
        message:'未登录或登录超时,请重新登录'
      })
        return Promise.reject('error')
    }

      //70001 权限认证错误
      if(res.code == 70001){
        console.log('权限认证错误');
        Message({
          type:'warning',
          showClose:true,
          message:'权限认证错误'
        })
        return Promise.reject('error')
      }

      return Promise.reject('error');
    }else{
      return response.data;
    }
  },
  error =>{
      Message({
        type:'warning',
        showClose:true,
        message:'连接超时'
      })
    return Promise.reject('error')
  })

export default service











