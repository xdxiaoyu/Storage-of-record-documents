# MVVM阅读

**本文记录一下阅读他人讲解的"MVVM原理及实现"的笔记**



>  注：别人讲解前先从MVC框架进行引入

## MVC框架

将整个页面分为View，Controller，Modal，视图发生变化,通过Controller(控制层)将响应传入待Model(数据源)， 由数据源改变View上面的数据。

但是由于MVC框架允许view和Model直接通信,随着业务量的扩大，可能会出现很难处理的依赖关系，完全背离了开发所应该遵循的”[开发封闭原则]([https://baike.baidu.com/item/%E5%BC%80%E6%94%BE%E5%B0%81%E9%97%AD%E5%8E%9F%E5%88%99/6028662?fr=aladdin](https://baike.baidu.com/item/开放封闭原则/6028662?fr=aladdin))“。



## MVVM详解

1、实现数据与视图分离

2、通过数据来驱动视图，开发中只需要关心数据变化，DOM操作被封装了。



## VUE双向绑定原理

1、数据劫持结合发布者-订阅者模式，通过Object.defineProperty()来劫持各个属性的setter,getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

> 注： Angular是脏值检查实现的，为啥叫脏值检查（因为在angular中，他没办法判断你的数据是否做了改变，所有它设置了一些条件，当你触发这些条件后，他就执行一个检测来遍历所有的数据，对比你更改了地方，然后执行变化。这个检查很不科学。而且效率不高，有很多多余的地方，所以官方称为 脏检查）
>

**思路：**

要实现MVVM的双向绑定，

1、实现一个数据监听Observer，能够对数据对象的所有属性进行监听。如果有变动，通知订阅者

2、实现一个订阅者Watcher，用来接收属性变化并执行相应的函数，从而更新视图

3、实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据初始化相应的订阅器





# Vue源码

> **尤雨溪Vue教程讲解笔记**

## 1、响应式   

> (convert 转换)    View =  render(state)

``` js
functioon convert (obj) {
    Reflect.ownKeys(obj).forEach(key => {
        let internalValue = obj[key]
        Object.defineProperty(obj, key, {
            get() {
  				console.log(`监听：":${internalValue}`)
                return internalValue
            }, 
            set (newValue) {
                console.log(`监听：":${newValue}`)
                internalValue = newValue
            }
        })
    })
}
```





## 2、依赖追踪

### 依赖的理解：

> 创建一个叫Dep的类，这个类有两个方法，depend和notify。depend表示当前正在执行的代码依靠这种依赖性，notify表示依赖发生改变，任何之前被定义为依赖的：表达式、计算，都会被通知重新执行函数。也就是说我们需要找到一种让他们建立关联的方法，函数或一段表达式或计算，把这种计算关系叫依赖，另外这种计算也可能被认为是这种订阅者模式。

``` js
let activ
```

