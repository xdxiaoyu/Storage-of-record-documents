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

Vue.use(Vuex) 

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
export default new Vuex.Store({
  // 定义数据
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
        // 这样每个组件上都能直接实现this.$store去访问store里面的东西
        	if(this.$option.store) { 
        		this.$store = this.$options.store
    		} else {
                this.$store = this.$parent && this.$parent.$store
            }
    	}
    })
}


class Store { // 用户获取的是这个store类的实例
    constructor(options) {
        // 创建Vue的实例 保证更新状态可以刷新视图
        this.vm = new Vue({
            data: {
                state: optons.state
            }
        })
    }
    
    // es6 的访问器
    get state() {
        return this.vm.state
    }
    
    this.getters = {}
	this.mutations = {}
	this.actions = {}
	// 1、需要将用户传入的数据进行格式化操作
	this.moudules = new ModulesCollections(options)

	// 2、递归的安装模块
	installModule(this,this.state,[], this.modules.root)

	// 调用
	commit = (mutationName, payload) => {
        // es7写法 这个里面的this 永远指向当前的store实例
    	this.mutaions[mutationName].forEach(fn =>fn(payload))
    }
    
    dispath = (actionName, payload) => {
        this.actions[actionName].forEach(fn =>fn(payload))
    }
}

// 定义一个forEach遍历当前对象属性然后执行一个回调函数,后面要用到
const forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}

// 格式化用户数据
class ModuleCollection {
    constructor(options) {
        // 深度将所有的子模块都遍历一遍
        this.register([], ooptions)
    }
    register(path, rootModule) {
        let rawModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        if(!this.root) {
            this.root = rawModule
        } else {
            // 找到要定义的模块，将这个模块定义他父亲的_children属性里
            let parentModule = path.slice(0,-1).reduce((root, current) => {
                return root._children[current]
            }, this.root)
            parentModule._childen[path[path.length - 1]] = rawModule
        }
        
        // 如果有子模块
        if(rootModule.modules) {
            forEach(rootModule.modules,(moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

// 递归安装模块
function installModule(store, rootState, path, rawModeule) {
    // 如果有子模块,安装子模块的状态
    if(path.length > 0) {
        let parentState = path.slice(0,-1).reduce((root, current) => {
            return root[current]
        }, rootState)
         Vue.set(parentState, path[path.length -1],rawModule.state)
    }
    
    let getters = rawModule._raw.getters // 取用户的getter
    if(getters) {
        forEach(getters, (getterName, value) => {
            Object.defineProperty(store.getters, getterName, {
                get: () => {
                    return value(rawModule.state)
                }
            })
        })
    }
    
    let mutations = rawModule.raw.mutations // 取用户的mutation
    if(mutations) {
        forEach(mutations, (mutationName, value) => {
       let arr = store.mutations[mutationName] || (store.mutaons[mutationName] = [])
        })
        arr.push((plyload) => {
            value(rawModule.state, payload)
        })
    }
    
    let actions = rawModule._raw.actions // 取用户的action
    if(actions) {
        forEach(actions, (actionName, value) => {
            let arr = store.actions[actionName] || (store.actions[actionName] = [])
            arr.push((payload) => {
                value(store, payload)
            })
        })
    }
    
    // 递归
    forEach(rawModule._childen, (moduleName, rawModule) => {
        installModule(store, rootState, path.concat(moduleName),rawModule)
    })
}
```



## 3.实现步骤总结：

1、作为插件引入，执行install方法调用Vue.mixin在Vue全局生命周期混入一个方法，将Vuex中定义的数据源挂载到this.$store,即当前组件的实例上。

2、state 直接new Vue实例，将数据源传入。完成数据源响应式操作。

3、getters 递归遍历用户传入的getters对象，拿到每个里面每一个函数，通过Object.definedProperty属性处理。当get函数读取compile，触发get调用相应函数（函数内部自动传入当前数据源state作为参数），完成数据响应。

4、mutations 递归遍历用户传入的mutations 对象，将相同名称下的函数都挂载到当前实例的mutations数组中，完成订阅。commit的时候拿到对应的函数名称进行遍历mutations数组调用对应名称函数，完成发布。

5、actiosns 操作和mutations一样。

6、module 是将用户传入的数据进行格式化，格式化好以后执行上面的安装模块的方法。具体查看上方installModule方法的详细操作。

