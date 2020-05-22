# ES7



## Array

### ES7数组如何判断元素是否存在

```JavaScript
const arr = [1, 2, 3, 4, 5, 6, 7]
arr.includes(4) // true
```



## Math

### ES7数学乘方如何简写

```javascript
// 之前的做法
console.log(Math.pow(2,5));
//32

console.log(2 ** 5); // Math.pow()的简写
// 32
```





# ES8



## Async\Await

### await 只能出现在saync函数中

```javascript
// 用一个小栗子演示一下async和Await的使用
// 使得下面两个函数顺序执行。先准备好，再出去玩。
function wait() {
    setTimeout(() => {
        console.log('朋友准备中....')
    },1000)
}
function go() {
    console.log('朋友准备完毕，一起出去玩')
}

async function test() {
    let promise = new Promise(resolve => {
        setTimeout(() => {
        	console.log('朋友准备中....')
        	resolve()
        })
    })
    await promise
    await go()
}
```



### async实现原理

> async函数的实现原理，就是将Generator函数和自动执行器，包装在一个函数里。

```

```

