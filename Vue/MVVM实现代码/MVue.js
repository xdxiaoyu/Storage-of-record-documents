/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-07-03 11:08:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-07-06 21:19:31
 */
const compileUtil = {
  getVal(expre, vm) {
    return expre.split('.').reduce((data, currentVal) => {
      return data[currentVal]
    }, vm.$data)
  },
  setVal(expre, vm, inputVal) {
    return expre.split('.').reduce((data, currentVal) => {
      return data[currentVal] = inputVal
    }, vm.$data)
  },
  getContentVal(expre, vm) {
    return expre.replace(/\{\{(.+?)\}\}/g, (...arges) => {
      return this.getVal(arges[1], vm)
    })
  },
  // expre 自定义属性绑定的值
  text(node, expre, vm) {
    let value;
    if (expre.indexOf('{{') !== -1) {
      // 处理{{person.name}}
      value = expre.replace(/\{\{(.+?)\}\}/g, (...arges) => {
        new watcher(vm, arges[1], () => {
          this.updater.textUpdater(node, this.getContentVal(expre, vm))
        })
        return this.getVal(arges[1], vm)
      })
    } else {
      value = this.getVal(expre, vm)
    }
    this.updater.textUpdater(node, value)
  },
  html(node, expre, vm) {
    const value = this.getVal(expre, vm)
    // 绑定watcher
    new watcher(vm, expre, (newVal) => {
      this.updater.htmlUpdater(node, newVal)
    })

    this.updater.htmlUpdater(node, value)
  },
  model(node, expre, vm) {
    const value = this.getVal(expre, vm)
    // 绑定更新函数 数据=>视图
    new watcher(vm, expre, (newVal) => {
      this.updater.modelUpdater(node, newVal)
    })
    // 视图=>数据=>视图
    node.addEventListener('input', (e) => {
      // 设置值
      this.setVal(expre, vm, e.target.value)
    })

    this.updater.modelUpdater(node, value)
  },
  on(node, expre, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expre]
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  bind(node, expre, vm, attrName) {
    const value = this.getVal(expre, vm)
    this.updater.bindUpdate(node, attrName, value)
  },

  updater: {
    bindUpdate(node, attrName, value) {
      node[attrName] = value
    },
    modelUpdater(node, value) {
      node.value = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    textUpdater(node, value) {
      console.log(777, value);
      node.textContent = value
    }
  }

}

class Compile {
  constructor(el, vm) {
    // 判断el是否是元素节点对象
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1.获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el)

    // 2.编辑模板
    this.compile(fragment)

    // 3.追加子元素到根元素
    this.el.appendChild(fragment)

  }
  compile(fragment) {
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 是元素节点
        // 编译元素节点
        // console.log('元素节点:',child)
        this.compileElement(child)
      } else {
        // 文本节点
        // 编译文本节点
        // console.log('文本节点:',child)
        this.compileText(child)
      }

      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
  compileElement(node) {
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      const { name, value } = attr
      if (this.isDirective(name)) { // 是一个指令 v-text v-html v-model v-on:click
        const [, dirctive] = name.split('-')
        const [dirName, eventName] = dirctive.split(':')
        // 更新数据 数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName)

        // 删除有指令的标签上的属性
        node.removeAttribute('v-' + dirctive)
      } else if (this.isEventName(name)) {
        let [, eventName] = name.split('@')
        compileUtil['on'](node, value, this.vm, eventName)
        // 删除有指令的标签上的属性
        node.removeAttribute('@' + eventName)
      } else if (this.isBindName(name)) {
        let [, eventName] = name.split(':')
        compileUtil['bind'](node, value, this.vm, eventName)
        // 删除有指令的标签上的属性
        node.removeAttribute(':' + eventName)
      }
    })
  }
  isBindName(attrName) {
    return attrName.startsWith(':')
  }
  isEventName(attrName) {
    return attrName.startsWith('@')
  }
  compileText(node) {
    const content = node.textContent
    if (/\{\{(.+?)\}\}/.test(content)) {
      // console.log(content)
      compileUtil['text'](node, content, this.vm)
    }
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  node2Fragment(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild)
    }
    return f
  }
  isElementNode(node) {
    // nodeType属性返回 以数字值返回指定节点的节点类型。1-元素节点 2-属性节点
    return node.nodeType === 1
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1.实现一个数据的观察者
      new Observer(this.$data)
      // 2.实现一个指令解析器
      new Compile(this.$el, this)
      this.proxyData(this.$data)
    }
  }
  proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this,key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      }) 
    }
  }
}