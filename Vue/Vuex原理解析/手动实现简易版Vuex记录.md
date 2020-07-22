# Vuex原理解析

**Vuex是基于Vue的响应式原理基础，所以无法拿出来单独使用，必须在Vue的基础之上使用。**



## Vuex使用相关解析

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

