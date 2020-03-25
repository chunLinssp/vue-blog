import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {getToken} from "@/requests/token"
import store from "@/store"
import Message from "element-ui/packages/message/src/main";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/logins',
      component: () => import('@/views/Login')
    },
    {
      path:'/register',
      component: () => import('@/views/Register')
    },
    {
      path: '',
      name: 'home',
      component: () => import('@/Home'),
      children:[
        {
          path:'/',
          name:'index',
          component:() => import('@/views/Index')
        },
        {
          path:'/write/:id?',
          component:() => import('@/views/blog/BlogWrite'),
          meta:{
            requireLogin:true
          }
        },
        {
          path:'/CardTag/all',
          component:() => import('@/components/card/CardTag')
        },
        {
          path:'/archives/:year?/:month?',
          component:() => import('@/components/card/CardArchive')
        },
        {
          path:'/CardCategory/all',
          component:() => import('@/components/card/CardCategory')
        },
        {
          path:'/article/:id',
          component:() => import('@/views/blog/BlogView')
        },
        {
          path:'/article/tagTmp/all/:id/:tagName',
          component:() => import('@/views/summary/TagSummary')
        },
        {
          path:'/myData',
          component:() => import('@/views/manager/account')
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if(getToken()){
    if(to.path === '/login'){
      next({path:'/'})
    }else{
      if(store.state.account == ''){
        store.dispatch('getUserInfo').then(data =>{
          next();
        }).catch(()=>{
          next({path:'/'});
        })
      }else{
        next();
      }
    }
  }else{
    if(to.matched.some(r => r.meta.requireLogin)){
      Message({
        type:'warning',
        showClose:true,
        message:'请先登录哦'
      })
    }else{
      next();
    }
  }
})

export default router
