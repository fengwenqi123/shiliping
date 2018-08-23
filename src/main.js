/* eslint-disable spaced-comment,no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */
import './common/iconfont/iconfont.css'
import '@/common/css/main.css'
// import 'common/iconfont/iconfont.ttf'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import '@/common/stylus/index.styl'
// import '@/common/js/fontSize'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// eslint-disable-next-line no-unused-vars

Vue.use(ElementUI)
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.prototype.apiUrl = '/track/'
// Vue.prototype.ImgUploadUrl = '/track/storage'
Vue.prototype.apiUrl = 'http://192.168.1.207:8100/'
Vue.prototype.ImgUploadUrl = 'http://192.168.1.207:8100/storage'
// Vue.prototype.apiUrl = 'http://192.168.1.102:8100/'
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

