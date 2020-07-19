import Vue from 'vue'
import Vuex from './vuex/index'

Vue.use(Vuex) // 默认会执行当前插件的install方法

// 通过Vuex中的一个属性 Store 创建一个store的实例
export default new Vuex.Store({
  state: {
    age: 10
  },
  mutations: {
    syncChange (state, payload) {
      state.age += payload
    }
  },
  actions: {
    asyncChange ({ commit }, payload) {
      setTimeout(() => {
        commit('syncChange', payload)
      }, 1000)
    }
  },
  getters: {
    myAge (state) {
      return state.age + 20
    }
  }
})
