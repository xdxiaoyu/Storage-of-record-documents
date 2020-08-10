## Node.js事件

### 		Node.js事件循环

Node.js是单进程单线程应用程序，但是因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大量并发，所以性能非常高。

Node.js几乎每一个API都是支持回调函数的。

Node.js基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js单线程类似进入一个while(true)的世界循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。



```js
开启进程
开启线程
初始化数据，window/document/loaction...
while (true) {
    
    初始化事件列表
    根据事件修改数据
    根据数据去渲染页面
    
    
    
    if(count === 0) {
        运行js代码
        btn.onclick = function() {
        	document.body.style.background = 'skyblue'
        	console.log(123)
    	}
    		console.log(456)
        	count++
    }
    
}
```





























 