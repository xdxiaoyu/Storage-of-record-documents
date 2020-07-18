let Vue
class Store { // 用户获取的是这个Store类的实例
  constructor (options) {
    // 获取用户new 实例时传入的所有属性
    // this.state = options.state
    this.state = {
      age: 100
    }
    console.log(options)
  }
}

// 官方API
// 如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
const install = (_Vue) => { // Vue构造函数
  Vue = _Vue // Vue的构造函数
  // 放到Vue的原型上 不对 因为默认会给所有的实例增加
  // 只有从当前的根实例开始 所有根实例的子组件才有$store方法
  Vue.mixin({ // 组件的创建过程是先父后子
    beforeCreate () {
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
