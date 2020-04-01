## Array

------

1、ES5中有多少种遍历数组的方法？各有什么优缺点
```javascript
//1、for循环 ->可以通过break和continue控制循环
const arr = [1,2,3,4,5]
for(let i = 0; i< arr.length; i++) {
    if(arr[i] === 2) {
        break
    }
    console.log(arr[i])
}

//2、forEach
arr.forEach((item) => {
    console.log(item)
})

//3、every ->特殊性，能否继续遍历取决于函数体返回值是不是true，默认返回false
arr.every((item) => {
    if(item === 2) {
        
    } else {
       console.log(item)
    }
    return true
})

//4、for in -> 用来遍历对象 。 
for(let index in arr) {
    if(index == 2 ) {
        continue
    }
    console.log(index,arr[index])
}
//for in 可以遍历数组的原因：1、数组也是对象的一种。2、数组是可遍历的。
arr.a = 8

// 0 1; 1 2; 2 3; 3 4; 4 5; a 8 
// 打印下标却会出现字符串 a。有瑕疵;index下标是字符串，不是Number

```



2、ES6中
```javascript
// for of -> 不仅可以遍历对象和数组，还可以遍历其他数据结构
for (let item of arr) {
    console.log(item)
}
```