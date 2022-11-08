import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'

//引入mockserve.js
import '@/mock/mockserve'
//引入swiper的样式
import 'swiper/css'
//引入element-ui
// 引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI的所有样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
