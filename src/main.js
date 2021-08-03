import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './assets/fonts2/iconfont.css'
// 导入全局样式表
import './assets/global.css'
import moment from "moment";
import axios from 'axios'
import * as echarts from 'echarts';
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
Vue.prototype.$moment = moment; //赋值使用

// 配置请求根路径 http://itcgq.com:8888/api/private/v1/
axios.defaults.baseURL = ''
// 拦截请求 验证浏览器是否包含token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
