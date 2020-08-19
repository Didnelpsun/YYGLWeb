// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Router from 'vue-router'
import ElementUI from 'element-ui'

// ElementUI 配置项
import 'common/js/elementUI'

import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// axios.defaults.withCredentials = true
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://192.168.0.39:8060'
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'
// axios.defaults.withCredentials = true
// axios.defaults.headers.common['Set-Cookie'] = window.sessionStorage.assign
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'

axios.defaults.timeout = 4800000 // 请求超时 8分钟
// axios设置头部token
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }
)
axios.defaults.retry = 4 // 重试次数
axios.defaults.retryDelay = 1000// 重试延时
// axios 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error && error.response) {
    error = error.response
    switch (error.status) {
      case 202:
        ElementUI.Message.error('请求失败！')
        console.log(error)
        break
      case 401: //  token过期
        ElementUI.Message.error('未授权，请重新登录')
        location.href = '#/login'
        localStorage.clear()
        sessionStorage.clear()
        break
      case 409: //  没权限
        ElementUI.Message.error('发生错误，请联系管理员！')
        break
      case 404:
        ElementUI.Message.error('发生错误，请联系管理员！')
        break
      case 504:
        ElementUI.Message.error('请求失败！')
    }
    return Promise.reject(error)
  }
})

// 防止 vue 路由报错 Uncaught (in promise) NavigationDuplicated  参照：https://blog.csdn.net/weixin_43202608/article/details/98884620
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
