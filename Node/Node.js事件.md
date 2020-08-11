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

**事件机制原理：**

```js
let fs = require('fs')

fs.readFile('hello.txt', { flag: 'r', encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    yuEvent.emit('helloSuccess', data)
    // 1数据库查看所有用户详细信息
    // 2统计用户年龄比例
    // 3查看所有用户学校的详细信息
  }
})

let yuEvent = {
  event: {
    // helloSuccess: [fn,fn,fn]
  },
  on: function (eventName, eventFn) {
    if (this.event[eventName]) {
      this.event[eventName].push(eventFn)
    } else {
      this.event[eventName] = []
      this.event[eventName].push(eventFn)
    }
  },
  emit: function (eventName, EventMsg) {
    if (this.event[eventName]) {
      this.event[eventName].forEach(itemFn => {
        itemFn(EventMsg)
      })
    }
  }
}

yuEvent.on('helloSuccess', (EventMsg) => {
  console.log('1数据库查看所有用户详细信息');
})
yuEvent.on('helloSuccess', (EventMsg) => {
  console.log('2统计用户年龄比例');
})
yuEvent.on('helloSuccess', (EventMsg) => {
  console.log('3查看所有用户学校的详细信息');
})

// PS D:\exces\PracticeCode\Node相关\事件> node read.js
// 运行结果：
// username,age,sex,school
// 1数据库查看所有用户详细信息
// 2统计用户年龄比例
// 3查看所有用户学校的详细信息
```



**Node内置的event模块进行调用**

```js
let events = require('events')
let fs = require('fs');
let ee = new events.EventEmitter()

ee.on('helloSuccess', (data) => {
  console.log('学Node');
  console.log(data);
})
ee.on('helloSuccess', () => {
  console.log('学webpack');
})
ee.on('helloSuccess', () => {
  console.log('学React');
})

function xyReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
xyReadFile('hello.txt').then(res => {
  ee.emit('helloSuccess', res)
})
// 第二种写法
async function test() {
  let data = await xyReadFile('hello.txt')
  ee.emit('helloSuccess', data)
}
test()

// PS D:\exces\PracticeCode\Node相关\事件> node event.js
// 学Node
// 窗前明月光
// 学webpack
// 学React
```



















 