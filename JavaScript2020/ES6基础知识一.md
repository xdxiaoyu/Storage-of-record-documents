# Array

**ES5中如何将伪数组转换为数组？ES6？**

```javascript
let args = [].slice.call(arguments) // collection
let imgs = [].slice.call(document.querySelectorAll('img')) // NodeList
```



什么是伪数组：1、这个对象是按索引方式存储数据的。2、它具备length属性
```javascript
//Array.from 
let args = Array.from(arguments)

// Array.form(arrayLike,mapFn,thisArg)

let args = Array.form({ length: 5},function() { return 1 }) // 第二个参数是方法，相当于遍历每次都要执行的
console.log(args) // [1,1,1,1,1]
```
从上面的小栗子可以学习到：1、伪数组概念；2、伪数组到数组的转换；3、Array.from还具备遍历的功能。



生成新数组的方式：

```javascript
let array = Array(5) // 第一种
let array = ["",""]  // 第二种，对象字面量方式

// ES6 
let array = Array.of(1,2,3,4)  // 第三种 Array.of
console.log(array) // [1,2,3,4]

let array = Array(5).fill(1)  // 第四种 Array.fill (可替换指定位置数据)
console.log(array) // [1,1,1,1,1]
// Array.fill(value,start,end) 默认start为0，end为数组最后一位;不包含end
let array = [1,2,3,4,5]  
console.log(array.fill(9,0,2)) // [9,9,3,4,5]

```

以上认知到生成新数组的方式，对于ES6中，有Array.of()可以、Array.fill()可以。
对于：生成指定长度且内容一样的数组，不仅可以使用for循环，Array.form()简便而Array.fill()极简。



**ES5中如何查找一个元素？ES6？**

查找有两个概念，一查找的目的是为了验证某个元素在这个数组中；二我要把满足条件的筛选出来

```javascript
let array = [1,2,3,4,5]
//ES5
let find = array.filter(item => item%2 === 0)// 等同 (item)=>{return item%2 === 0})
cosnole,log(find) // [2,4]
// filter更像第二个概念，但是filter都可以实现。实现第一个用filter不是最高效的，因为如果数组特别长、它不会找到这个元素就停止，还会继续查找。【filter关注的是满足你条件的所有值，返回所有值的数组】

//ES6
let find = array.find(item => item%2 === 0) 
cosnole.log(find) // 2
//find 【关注的是满足你条件的第一个值，找到就返回告诉你有，关注的是有和没有。返回的是值】

let find = array.findIndex(item => item%2 === 0)
console.log(fin) // 1 
//findIndex 【找到返回的位置】
```

数组=》 遍历 转换 生成 查找



------



# Class

```javascript
ES5
类的声明
let Animal = function(type) {
  this.type = type
  this.eat = function () {
    console.log('i am eat foot');
  }
}
// 定义实类，生成实例
let dog = new Animal('dog')
let monkey = new Animal('monkey')
console.log(dog); // Animal {type:"dog",eat:f}
console.log(monkey); // Animal {type:"monkey",eat:f}
monkey.eat = function () {
  console.log('error');
}
dog.eat() // i am eat foot
monkey.eat()  // error 违背了继承的原则


//ES6
class Animal {
  constructor(type) {
    this.type = type
  }
  eat() {
    console.log('i am eat hello')
  }
}
let dog = new Animal('dog')
let monkey = new Animal('monkey')
console.log(dog); //Animal {type:"dog"}
console.log(monkey); //Animal {type:"monkey",eat:f}
dog.eat() // i am eat hello
monkey.eat() // i am eat hello

// Animal.prototype.eat = function () {console.log('i am eat foot')}
//ES6的这样写法等同于 ES5构造函数中在原型链中添加共有方法
```
>  Class只是ES5用原型链声明类的语法糖
> 语法糖？ -> 语法不一样，但最后的本质是一样的。



getter和setter

```JavaScript
let _age = 4
class Animal {
  constructor(type) {
    this.type = type
  }
  get age () {
    return _age
  }
  set age (val) {
    if(val%2 === 0) {
      _age = val
    }
  }
  eat() {
    console.log('i am eat hello')
  }
}
let dog = new Animal("dog")
console.log(dog.age); 4
dog.age = 8
console.log(dog.age); 8
```



ES5将对象属性分为：

内部属性(对象中有，但是不能随意用.访问属性)
命名属性：所有能用.访问到的属性  
命名属性->
 1、数据属性（值直接保存在属性本地的属性，ex: var lilei={sanme:"LI Lei"}）ES5中，一个属性不再是一个普通变量，而是一个微缩的小对象。每个属性都有一个value特性储存属性值，还有三个开关实现自我保护：

```javascript
let eric = { 
	eid:1001,
    ename:"埃里克",
    salary:12000
}

//这个eid也是一个小对象
eid: {
    value:1001,
    writable:true, // 是否可修改属性值
    enumerable:true, // 是否可在for in 遍历时被看到 ----隐藏
    configurable:true // 2件事：1、是否可以删除该属性 2、是否可修改其他两个开关
}
//设置开关需要用defineProperty  
Object.defineProperty(对象,"属性名", {
    开关：true / false
} )
ex: //让eric的eid属性只读 
Object.defineProperty(eric,"eid",{
    writable:false
})
```

2.访问器属性：不实际存值，仅提供对其它数据属性保护业务的特殊属性。想用自定义规则保护属性时，只能用访问器属性

```javascript
// 如何？ 1、先定义一个隐藏姓名的半隐藏数据属性实际存储数据
Object.defineProperty(eric,"_eage", {
	value:25,
	writable:true,
    enumerable:false,
    configurable:false,
})
// 2.添加正式属性名称的访问器属性，用来保护隐藏的数据属性
Object.defineProperty(eric,"eage", {
    // 帮用户去属性中取值
    get:function() { return this._eage } 
    // 帮用户将新值送入属性中，但是会先验证是否符合规则。不符合将不保存直接报错。
    set:function(value) { 
    	if(value%2 === 0 ) { 
            this._eage = value
        } else { throw Error("error") }
	}
	enumerable:true, // 代替受保护属性抛头露面
    configurable:true, // 不能删除'保镖'
})
```

> 保护对象有3个层次
>1、防扩展：禁止向对象中添加新属性
>Object.preventExtensions(obj) 
> 原理： 其实每个对象都有一个隐藏的内部属性：extensible:true  所有对象默认都是可拓展的
>2、密封：在兼具方扩展同时，进一步禁止删除所有属性，属性值依然可以改
>Object.seal(obj) 
> 原理：1.preventExtensions  2.自动将所有属性的configurable改为false
> 3、冻结：在兼具密封的基础上，禁止修改所有属性值
> Object.freeze(obj)
> 原理：1. 自动执行seal()  2.自动修改所有属性的writable为false



静态方法：-> 不属于对象实例的，而属于这个类的。（实例对象是没有的）

```JavaScript
// ES5->实现类的静态方法
let Animal = function (type) {
    this.type=type
}
Animal.protopyte.eat = function () {
    Animal.walk()
    console.log('i am eat foot')
}
Animal.walk = function () {
    console.log('i am walking')
}
dog.eat() // i am walking   i am eat foot

//ES6->实现类的静态方法 
class Animal {
    construction(type) {
        this.type = type
    }
    eat () {
        Animal.walk()
        console.log('i am eat foot')
    }
    static walk () {
        console.log('i am walking ')
    }
}
dog.eat() // i am walking   i am eat foot
```

