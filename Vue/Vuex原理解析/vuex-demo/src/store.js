/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-20 08:27:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-21 10:59:07
 */
import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex/index1'

Vue.use(Vuex) // 默认会执行当前插件的install方法

// 通过Vuex中的一个属性 Store 创建一个store的实例
export default new Vuex.Store({
  modules: {
    a: {
      state: {
        age: 'a100'
      },
      mutations: {
        syncChange() {
          console.log('a');
        }
      },
    },
    b: {
      state: {
        age: 'b100'
      },
      mutations: {
        syncChange() {
          console.log('b');
        }
      },
      modules: {
        c: {
          state: {
            age: 'c100'
          },
          mutations: {
            syncChange() {
              console.log('c');
            }
          },
        }
      }
    }
  },
  state: {
    age: 10
  },
  mutations: {
    syncChange(state, payload) {
      state.age += payload
    }
  },
  actions: {
    asyncChange({ commit }, payload) {
      setTimeout(() => {
        commit('syncChange', payload)
      }, 1000)
    }
  },
  getters: {
    myAge(state) {
      return state.age + 20
    }
  }
})
