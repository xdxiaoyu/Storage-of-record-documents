## Promise和async

**写法不同**

ES5正常写法

```js
getAjax(url, (res) => {})
```

Promise

```js
get(url).then((res) => {})
```

async_awaiy

```
(async() => {
	let res = await get(url)
})()
```



总结：

- ES5写法和promise写法，主要区别在写法的不同可以让回调函数，划分出去在.then的函数里去执行，使得代码更加的另外，也可以将两个不同的参数，可以划分开来写。
- async和promise的区别，主要在于async是promise的语法糖，这种形式的写法在底层编译之后会自动转换成promise的写法



## **Promise实现原理**

promise需要实现的功能

```js
function fn(resolve,reject){
    setTimeout(() => {
      if(true) {
         resolve()
      } else {
         reject()
      }
    })
}
var p1 = new LcPromise(fn)
p1.then((res) => {
    
})

p1.catch((err) => {
    
})
```



p1promise对象发送了异步操作，必然会有一个未来事件，在未来要执行。这个过程由传入的函数对象fn执行。函数fn里必须需要有成功执行和失败执行的函数



1创建类构造对象

```js
class lcPromise{
    constructor(fn) {
        // 将成功的事件函数集成在successLits数组里
        this.successList = []
        // 这里将所有的失败函数集成到failList里
        this.failList = []
        // pending，fullfilled，rejected
        this.state = 'pending'
        // 传入的函数对象，（异步操作的函数内容）
        fn(this.resolveFn.bind(this),this.rejectFn.bind(this))
    }
    then(successFn,failFn) {
        if(typeof successFn == 'function') {
            this.successList.push(successFn)
        }
        if(typeof failFn == 'function') {
            this.failList.push(failFn)
        }
    }
    catch(failFn) {
        if(typeof failFn == 'function') {
            this.failList.push(failFn)
        }
    }
    resolveFn(res) {
        this.state = 'fullfilled'
        this.successList.forEach((item,index) => {
            // 将成功的事件循环
            item(res)
        })
    }
    rejectFn(res) {
        this.state = 'rejected'
        // 注册到的失败所有事件进行调用
        this.failList.forEach((item,index) => {
            item(res)
        })
        throw Error(res)
    }
}
```

1.构造函数的作用：

- 声明成功函数放置的数组对象
- 声明失败函数放置的数组对象
- 定义初始化状态
- 调用传入进行执行异步内容的函数（在未来有成功的结果时调用传入进去的成功函数，在未来失败时调用传入进去失败的函数）

2.传入成功或者失败时需要调用的函数，作用：

- 将成功和失败的函数传入值成功和失败的数组里

3.定义调用成功和失败的函数，作用：

- 成功时调用成功数组里所有的函数，失败时调用失败数组里所有的函数

























