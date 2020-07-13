# 对Vue中的MVVM原理解析和实现
```tips
首先你对Vue需要有一定的了解，知道MVVM。这样才能更有助于你顺利的完成下面原理的阅读学习和编写
```



> 下面由我阿巴阿巴的详细走一遍Vue中MVVM原理的实现，这篇文章大家可以学习到：
>
> 1.Vue数据双向绑定核心代码模块以及实现原理
>
> 2.订阅者-发布者模式是如何做到让数据驱动视图、视图驱动数据再驱动视图
>
> 3.如何对元素节点上的指令进行解析并且关联订阅者实现视图更新



## 1、思路整理

实现的流程图：

![mvvm](C:\Users\Administrator\Pictures\mvvm.png)



我们要实现一个类MVVM简单版本的Vue框架,就需要实现一下几点：

1、实现一个数据监听Observer，对数据对象的所有属性进行监听，数据发生变化可以获取到最新值通知订阅者。

2、实现一个解析器Compile解析页面节点指令，初始化视图。

3、实现一个观察者Watcher，订阅数据变化同时绑定相关更新函数。并且将自己放入观察者集合Dep中。Dep是Observer和Watcher的桥梁，数据改变通知到Dep，然后Dep通知相应的Watcher去更新视图。



## 2、实现

**以下采用ES6的写法，比较简洁，所以大概在300多行代码实现了一个简单的MVVM框架**。

### 1、实现html页面

> 按Vue的写法在页面定义好一些数据跟指令，引入了两个JS文件。先实例化一个MVue的对象，传入我们的el，data，methods这些参数。待会再看Mvue.js文件是什么？

html
```html
<body>
  <div id="app">
    <h2>{{person.name}} --- {{person.age}}</h2>
    <h3>{{person.fav}}</h3>
    <h3>{{person.a.b}}</h3>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <h3>{{msg}}</h3>
    <div v-text="msg"></div>
    <div v-text="person.fav"></div>
    <div v-html="htmlStr"></div>
    <input type="text" v-model="msg">
    <button v-on:click="click111">按钮on</button>
    <button @click="click111">按钮@</button>
  </div>
  <script src="./MVue.js"></script>
  <script src="./Observer.js"></script>
  <script>
    let vm = new MVue({
      el: '#app',
      data: {
        person: {
          name: '星哥',
          age: 18,
          fav: '姑娘',
          a: {
            b: '787878'
          }
        },
        msg: '学习MVVM实现原理',
        htmlStr: '<h4>大家学的怎么样</h4>',
      },
      methods: {
        click111() {
          console.log(this)
          this.person.name = '学习MVVM'
          // this.$data.person.name = '学习MVVM'
        }
      }
    })
  </script>
  
</body>
```

### 2、实现解析器和观察者

MVue.js

```javascript
// 先创建一个MVue类,它是一个入口
Class MVue {
    construction(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options
    }
    if(this.$el) {
        // 1.实现一个数据的观察者  	--先看解析器，再看Obeserver
        new Observer(this.$data)
        // 2.实现一个指令解析器
        new Compile(this.$el,this)
    }
}

// 定义一个Compile类解析元素节点和指令
class Compile {
    constructor(el,vm) {
        // 判断el是否是元素节点对象，不是就通过DOM获取
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 1.获取文档碎片对象，放入内存中可以减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el)
        
        // 2.编辑模板
        this.compile(fragment)
        
        // 3.追加子元素到根元素(还原页面)
        this.el.appendChild(fragment)
    }
    
    // 将元素插入到文档碎片中
    node2Fragment(el) {
        const f = document.createDocumnetFragment();
        let firstChild
        while(firstChild = el.firstChild) {
        	// appendChild 
        	// 将已经存在的节点再次插入，那么原来位置的节点自动删除，并在新的位置重新插入。
            f.appendChild(firstChild)
        }
        // 此处执行完，页面已经没有元素节点了
        return f
    }
    
    // 解析模板
    compile(frafment) {
        // 1.获取子节点
        conts childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if(this.isElementNode(child)) {
                // 是元素节点
                // 编译元素节点
                this.compileElement(child)
            } else {
                // 文本节点
                // 编译文本节点
                this.compileText(child)
            }
            
            // 嵌套子节点进行遍历解析
            if(child.childNodes && child.childNodes.length) {
                this.compule(child)
            }
        })
    }
    
    // 判断是元素节点还是属性节点
    isElementNode(node) {
        // nodeType属性返回 以数字值返回指定节点的节点类型。1-元素节点 2-属性节点
        return node.nodeType === 1
    }
    
    // 编译元素节点
    compileElement(node) {
        // 获得元素属性集合
        const attributes = node.attributes
        [...attributes].forEach(attr => {
            const {name, value} = attr
            if(this.isDirective(name)) { // 判断属性是不是以v-开头的指令
                // 解析指令（v-mode v-text v-on:click 等...）
                const [, dirctive] = name.split('-')
                const [dirName, eventName] = dirctive.split(':')
                // 初始化视图 将数据渲染到视图上
                compileUtil[dirName](node, value, this.vm, eventName)
                
                // 删除有指令的标签上的属性
                node.removeAttribute('v-' + dirctive)
            } else if (this.isEventName(name)) { //判断属性是不是以@开头的指令
                // 解析指令
                let [, eventName] = name.split('@')
                compileUtil['on'](node,val,this.vm, eventName)
                
                // 删除有指令的标签上的属性
        		node.removeAttribute('@' + eventName)
            } else if(this.isBindName(name)) { //判断属性是不是以:开头的指令
                // 解析指令
                let [, attrName] = name.split(':')
                compileUtil['bind'](node,val,this.vm, attrName)
                
                // 删除有指令的标签上的属性
        		node.removeAttribute(':' + attrName)
            }
        }) 
    }
    
    // 编译文本节点
    compileText(node) {
        const content = node.textContent
        
        if(/\{\{(.+?)\}\}/g)
    }
    
    // 判断属性是不是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断属性是不是以@开头的事件指令
    isEventName(attrName) {
        return attrName.startsWith('@')
    }
    // 判断属性是不是以:开头的事件指令
    isBindName(attrName) {
        return attrName.startsWith(':')
    }
}


// 定义一个对象，针对不同指令执行不同操作
const compileUtil = {
    // 解析参数(包含嵌套参数解析)，获取其对应的值
    getVal(expre, vm) {
        return expre.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    // 获取当前节点内参数对应的值
    getgetContentVal(expre,vm) {
        return expre.replace(/\{\{(.+?)\}\}/g, (...arges) => {
            return this.getVal(arges[1], vm)
        })
    },
    // 设置新值
    setVal(expre, vm, inputVal) {
        return expre.split('.').reduce((data, currentVal) => {
      		return data[currentVal] = inputVal
    	}, vm.$data)
    },
    
    // 指令解析：v-test
    test(node, expre, vm) {
        let value;
        if(expre.indexOf('{{') !== -1) {
            // 正则匹配{{}}里的内容
            value = expre.replace(/\{\{(.+?)\}\}/g, (...arges) => {
                
                // new watcher这里相关的先可以不看，等后面讲解写到观察者再回头看。这里是绑定观察者实现					 的效果是通过改变数据会触发视图，即数据=》视图。
                // 没有new watcher 不影响视图初始化(页面参数的替换渲染)。
                // 订阅数据变化，绑定更新函数。
                new watcher(vm, arges[1], () => {
                    // 确保 {{person.name}}----{{person.fav}} 不会因为一个参数变化都被成新值 
                    this.updater.textUpdater(node, this.getgetContentVal(expre,vm))
                })
                
                return this.getVal(arges[1],vm)
            })
        } else {
            // 同上，先不看
            // 数据=》视图
            new watcher(vm, expre, (newVal) => {
            	// 找不到{}说明是test指令，所以当前节点只有一个参数变化，直接用回调函数传入的新值
        		this.updater.textUpdater(node, newVal)
      		})
            
            value = this.getVal(expre,vm)
        }
        
        // 将数据替换，更新到视图上
        this.updater.textUpdater(node,value)
    },
    //指令解析： v-html
    html(node, expre, vm) {
        const value = this.getVal(expre, vm)
        
        // 同上，先不看
        // 绑定观察者 数据=》视图
        new watcher(vm, expre (newVal) => {
            this.updater.htmlUpdater(node, newVal)
        })
        
        // 将数据替换，更新到视图上
        this.updater.htmlUpdater(node, newVal)
    },
    // 指令解析：v-mode
    model(node,expre, vm) {
        const value = this.getVal(expre, vm)
        
        // 同上，先不看
        // 绑定观察者 数据=》视图
        new watcher(vm, expre, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })
        
        // input框  视图=》数据=》视图
        node.addEventListener('input', (e) => {
            //设置新值 - 将input值赋值到v-model绑定的参数上
            this.setVal(expre, vm, e.traget.value)
        })
        // 将数据替换，更新到视图上
        this.updater.modelUpdater(node, value)
    },
    // 指令解析： v-on
    on(node, expre, vm, eventName) {
        // 或者指令绑定的事件函数
        let fn = vm.$option.methods && vm.$options.methods[expre]
        // 监听函数并调用
        node.addEventListener(eventName,fn.bind(vm),false)
    },
    // 指令解析： v-bind
    bind(node, expre, vm, attrName) {
        const value = this.getVal(expre,vm)
        this.updater.bindUpdate(node, attrName, value)
    }
    
	// updater对象，管理不同指令对应的更新方法
	updater: {
        // v-text指令对应更新方法
        textUpdater(node, value) {
            node.textContent = value
        },
        // v-html指令对应更新方法
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        // v-model指令对应更新方法
        modelUpdater(node,value) {
            node.value = value
        },
        // v-bind指令对应更新方法
        bindUpdate(node, attrName, value) {
            node[attrName] = value
        }
    },
}
```

### 3、实现数据劫持监听

**我们有了数据监听，还需要一个观察者可以触发更新视图。因为需要数据改变才能触发更新，所有还需要一个桥梁Dep收集所有观察者(观察者集合)，连接Observer和Watcher。数据改变通知Dep，Dep通知相应的观察者进行视图更新。**

Observer.js

```javascript
// 定义一个观察者
class watcher {
    constructor(vm, expre, cb) {
        this.vm = vm
        this.expre = expre
        this.cb =cb
        // 把旧值保存起来
        this.oldVal = this.getOldVal()
    }
    // 获取旧值
    getOldVal() {
        // 将watcher放到targe值中
        Dep.target = this
        // 获取旧值
        const oldVal = compileUtil.getVal(this.expre, this.vm)
        // 将target值清空
        Dep.target = null
        return oldVal
    }
    // 更新函数
    update() {
    	const newVal =  compileUtil.getVal(this.expre, this.vm)
    	if(newVal !== this.oldVal) {
      		this.cb(newVal)
    	}
  	}
}


// 定义一个观察者集合
class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher)
    }
    //通知观察者去更新
    notify() {
        this.subs.forEach(w => w.update())
    }
}



// 定义一个Observer类通过gettr，setter实现数据的监听绑定
class Observer {
    constructor(data) {
        this.observer(data)
    }
    
    // 定义函数解析data,实现数据劫持
    observer (data) {
        if(data && typeof data === 'object') {
            // 是对象遍历对象写入getter，setter方法
            Reflect.ownKeys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            })
        }
    }
    
    // 数据劫持方法
    defineReactive(obj,key, value) {
        // 递归遍历
        this.observer(data)
        // 实例化一个dep对象
        const dep = new Dep()
        // 通过ES5的API实现数据劫持
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 当读当前值的时候，会触发。
                // 订阅数据变化时，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newValue) => {
                // 对新数据进行劫持纪监听
                this.observer(newValue)
                if(newValue !== value) {
                    value = newValue
                }
                // 告诉dep通知变化
        		dep.notify()
            }
        })
    }
    
}



```

