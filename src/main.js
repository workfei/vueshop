import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体小图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios // 设置axios请求

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
