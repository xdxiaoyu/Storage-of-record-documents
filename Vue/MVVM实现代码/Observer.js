/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-05 18:21:10
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-06 18:01:46
 */
class watcher {
  constructor(vm,expre,cb) {
    this.vm = vm,
    this.expre = expre
    this.cb = cb
    // 先把旧值保存起来
    this.oldVal = this.getOldVal()
  }
  getOldVal() {
    Dep.target = this
    const oldVal = compileUtil.getVal(this.expre, this.vm)
    Dep.target = null
    return oldVal
  }
  update() {
    const newVal =  compileUtil.getVal(this.expre, this.vm)
    if(newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者去更新
  notify() {
    this.subs.forEach(w => w.update())
  }
}

class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer (data) {
    if (data && typeof data === 'object') {
      Reflect.ownKeys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      })
    }
  }
  defineReactive (obj, key, value) {
    // 递归遍历
    this.observer(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get () {
        // 订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: (newValue) => {
        this.observer(newValue)
        if (newValue !== value) {
          value = newValue
        }
        // 告诉dep通知变化
        dep.notify()
      }
    })
  }
}