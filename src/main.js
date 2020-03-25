// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import  'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from "./store";
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(ElementUI)
Vue.use(ViewUI);
//
// Object.prototype(Vue.prototype,'$_',{value:lodash})
Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data:function () {
    return{
      account:''
    }
  },
  components: { App },
  template: '<App/>'
})
