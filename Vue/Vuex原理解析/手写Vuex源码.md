# Vuex原理解析

**Vuex是基于Vue的响应式原理基础，所以无法拿出来单独使用，必须在Vue的基础之上使用。**



## 1.Vuex使用相关解析

main.js

```js
import store form './store' // 引入一个store文件

new Vue({
    // 在Vue初始化的过程中，注入一个store属性，内部会将这个属性放到每个组件的$store上
    store, 
})
```



store.js

```js
import Vuex from 'Vuex'

Vue.use(Vuex) // 默认会执行当前插件的install方法

// 通过Vuex中的一个属性 Store 创建一个store的实例
export default new Vuex.Store({
    state: { // 单一数据源
        age: 10
    },
    mutations: { // 
        // payload 载荷 
        syncChange(state,payload) { // 修改状态的方法 同步更改
            state.age+= payload
        }
    },
    actions: {
        asyncChange({commit}, payload) {
            setTimeout(() => {
                commit('syncChange',payload)
            },1000)
        }
    }
})
//mutations中增加异步操作 严格模式下会直接报错，普通模式下不会报错但不合法
```



## 2.Vuex原理解析实现

> 首先我们要清楚Vuex的定位，它是一个插件。且必须基于之上Vue来使用，为什么这么说呢，因为他的数据响应是基于Vue的。



### 1.Vuex核心概念

① **state** 	驱动应用的数据源。

② **Getter**	getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生变化了改变才会被重新计算（由此你是不是想到了计算属性，对完全可以这么理解）。

③ **Mutation**	进行Vuex中store状态的更改，也是官方规定更改状态的唯一途径。

④ **Action**	进行异步操作的场所，但是更改数据还是需要commit提交。

⑤ **Module** 	单一状态树对象比较复杂，Vuex允许我们将Store分割成多模块，每个模块拥有自己独立的内容。



### 2.实现Vuex

store.js

> 先创建一个入口文件

```js
import Vue from 'vue'
// import Vuex from 'vuex' 官方的Vuex插件
import Vuex from './vuex/index1' // 自己写的Vuex

Vue.use(Vuex) // 默认会执行当前插件的install方法

// 通过Vuex中的一个属性 Store 创建一个store的实例
// 定义相关数据
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
```



index1.js

> 这边会暴露出一个install方法，Vue.sue()的时候会调用它。还有一个提供实例化的Store类

```js
let vue
const install = (_Vue) => {
    Vue = _Vue // install方法调用时，会将Vue作为参数传入
    
    Vue.mixin({ // 全局注册一个混入，影响注册以后的每一个创建的Vue实例。
        beforeCreate（） {
        // 判断当前根实例上有没有store,有的话把根组件的的store属性 放到每个组件的实例上
        	if(this.$option.store) { 
        		this.$store = this.$options.store
    		} else {
                this.$store = this.$parent && this.$parent.$store
            }
    	}
    })
}
// 这样每个组件上都能直接实现this.$store去访问store里面的东西
```







