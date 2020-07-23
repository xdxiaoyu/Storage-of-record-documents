/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-20 08:27:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-23 08:56:46
 */ 
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  store,
  render: h => h(App)
}).$mount('#app')
