/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-20 17:38:07
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-20 18:06:41
 */
let Vue
// const forEach = (obj, callback) => {
//   Object.keys(obj).forEach(key => {
//     callback(key, obj[key])
//   })
// }
class ModuleCollection {
  constructor(options) {
    console.log(options)
  }
}
class Store { // 用户获取的是这个Store类的实例
  constructor(options) {
    // 获取用户new 实例时传入的所有属性
    this.vm = new Vue({ // 创建vue的实例 保证更新状态可以刷新视图
      data: { // 默认这个状态，会被使用Object.defineProperty重新定义
        state: options.state
      }
    })
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    // 需要将用户传入的数据进行格式化操作
    this.modules = new ModuleCollection(options)
    /*
    let root = {
      _raw: rootModule,
      state: rootModule.state,
      _children: {
        a: {
          _raw: aModule,
          _children: {},
          state: aModule.state
        },
        b: {
          _raw: bModule,
          _children: {
            c: {

            }
          },
          state: bModule.state
        }
      }
    }
    */
    // -------------------------
    // 实现getters
    // const getters = options.getters // 获取用户传入的getters

    // forEach(getters, (getterNmae, value) => {
    //   Object.defineProperty(this.getters, getterNmae, {
    //     get: () => {
    //       return value(this.state)
    //     }
    //   })
    // })
    // 实现commit
    // 需要将用户定义的mutation 放到store上 订阅 发布 让数组中的函数依次执行
    // const mutations = options.mutations

    // forEach(mutations, (mutationName, value) => {
    //   this.mutations[mutationName] = (payload) => { // 订阅
    //     value(this.state, payload)
    //   }
    // })
    // 实现dispatch
    // const actions = options.actions

    // forEach(actions, (actionName, value) => {
    //   // 最后我们会做一个监控 看一下是不是异步方法都在action中执行的，而不是在mutation中执行的
    //   this.actions[actionName] = (payload) => {
    //     value(this, payload)
    //   }
    // })
  }

  commit = (mutationName, payload) => { // es7写法 这个里面的this 永远指向当前的store实例
    this.mutations[mutationName](payload) // 发布
  }

  dispatch = (actionName, payload) => { // 发布的时候会找到对应的action执行
    this.actions[actionName](payload)
  }

  // es6 中类的访问器
  get state() {
    return this.vm.state
  }
}
// 官方API
// 如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
const install = (_Vue) => { // Vue构造函数
  Vue = _Vue // Vue的构造函数
  // 放到Vue的原型上 不对 因为默认会给所有的实例增加
  // 只有从当前的根实例开始 所有根实例的子组件才有$store方法
  Vue.mixin({ // 组件的创建过程是先父后子
    beforeCreate() {
      // 把父组件的store属性 放到每个组件的实例上
      if (this.$options.store) { // 根实例
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  }) // 抽公共的逻辑 放一些方法
}

export default {
  Store,
  install
}
