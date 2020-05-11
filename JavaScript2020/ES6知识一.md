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
console.log(monkey); //Animal {type:"monkey"}
dog.eat() // i am eat hello
monkey.eat() // i am eat hello

// Animal.prototype.eat = function () {console.log('i am eat foot')}
//ES6的这样写法等同于 ES5构造函数中在原型链中添加共有方法
```
>  Class只是ES5用原型链声明类的语法糖
> 语法糖？ -> 语法不一样，但最后的本质是一样的。



# getter和setter

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



##### ES5将对象属性分为：

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



##### 静态方法：

-> 不属于对象实例的，而属于这个类的。（实例对象是没有的）

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



##### 类的继承

```JavaScript
// ES5
let Animal = function (type) {
    this.type = type
}
Animal.prototype.eat= function() {
    console.log('i am eat food')
}

let Dog = function (type) {
    Animal.call(this, type)
    this.run = function() {
        console.log('i can run')
    }
}
Dog.prototype = Animal.prototype
let dog = new Dog('dog')
dog.eat() // 'i am eat food'


// ES6
class Animal {
    constructor(type) {
        this.type = type
    }
    eat () {
        cosnole.log('i am eat food')
    }
}
class Dog extends Animal {
    constructor(type,age) {
        super(type)
        this.age = age
    }
}
let dog = new Dog('dog',5)
dog.eat() // 'i am eat food'
console.log(dog.age) // 5
```







# Function  Updates

> 默认值、不确定参数、箭头函数

```javascript
// 参数默认值
// ES5 
function f(x,y,z) {
    if(y === undefined) {
        y = 7
    }
    if(z === undefined) {
        z = 42
    }
    return x+y+z
}
console.log(f(1))  // 50
//ES6
function f(x,y=7,z=43) {
    // f.length 可以获取到没有默认值参数的个数
    return x+y+z
}
console.log(f(1))  //51


// 当函数传入参数不确定时
// ES5
function sum() {
    let num = 0
    //ES5
    Array.prototype.forEach.call(arguments,function(item) {
      num += item*1
    })
    //ES6
    Array.from(arguments).forEach(function(item) {
      num += item*1
    })
    return num
}
//ES6
function sum (one, ...nums) {
    let num = 0
    num = nums.reduce((x,y) => { return x+y })
    return num + one*2
}
console.log(1,2,3) // 7
// Rest参数 
//1、用来获取所有的参数的，而且是函数执行时的参数
//2、nums它是数组，不是伪数组。可以直接用数组API
//3、可以拆分开，将剩余不确定的参数放入nums中

function sum(x = 1, y = 2, z = 3) {
  return x + y + z
}
let data = [4, 5, 7]
// ES5-> console.log(sum.apply(this, data));  //16
// spread
// ES6 console.log(sum(...data)); //16




// 箭头后面是表达式，可以省略return和{}
let sun = (x,y,z) => ({
    x:x,
    y:y,
    z:z
}) //不加小括号报错,why? 小括号当做运算符表达式
console.log(sun(1,2,3)) // {x:1,y:2,z:3}
let sun = (x,y,z) => {
    return {
        x:x,
    	y:y,
    	z:z
    }
}
console.log(sun(1,2,4)) // {x:1,y:2,z:4}

//箭头函数this指向问题：箭头函数构建时执行了 eval，把最外层的作用域指向了空对象
// ES6的箭头函数的this指向，指向的是构建时的this的指向，不会改变，所以不是执行时this的指向
let test = {
    name:'test',
    say: () => {
        console.log(this.name)
    }
}
test.say() // undefined

let test = {
    name:'test',
    say: function () {
        console.log(this.name)
    }
}
test.say() // test
```



##### ES5对象中定义key,value以及函数 和ES6有啥区别

```javascript
let x = 1; let y = 2;let z =3
//ES5
let obj = {
    x:x,
    y:y,
    hello:function () {
        console.log('hello')
    }
}
//给obj增加一个动态的变量，存一个3的属性（z可以变化）
obj[z]=5
console.log(obj) // {x:1,y:2,3:5}

//ES6
let x=1;let y=2
let obj = { //给obj增加一个动态的变量，存一个3的属性（z可以变化）
    x,
    y,
    [y+z]:6, // [z+y]:6
    * hello() { // 异步函数 执行不会立即调用
        console.log('ES6 hello')
    }
}
// 等同于 function* functionName() {}
console.log(obj) // {x:1,y:2,3:6}  {x:1,y:2,5:6}
```



# 新的数据结构：

##### Set

```javascript
// Set 它所存储的数据必须是唯一的，接收的参数是一个可遍历的对象
let s = new Set
s.add('hi')  
s.add('hello').add('goodbey') // 写入数据
s.delete('hello') // 删除数据
s.clear() // 删除所有数据
console.log(s.has('hello')) // true 是否包含某个数据
console.log(s.size) // 3 指目前set存入数据的长度
for(let item of s) { console.log(item) } // 读数据 还可以使用forEach
```



##### ES6中Map是什么，解决什么问题，怎么用？

```javascript
// Map 它的key可是是任何值
// let map = new Map([[1, 2], [3, 4]])
let map = new Map()
map.set(1, 2)
map.set('x', 'xax')
// console.log(map);
// map.delete(1)
// map.clear()
// console.log(map.size);
// console.log(map.has('x'))
// console.log(map.get('x'))
// console.log(map.keys(), map.values(), map.entries())
// map.forEach((value, key) => {
//   console.log(value, key);
// })
for (let [key,value] of map) {
  console.log(key,value)
}
//键的类型是任意的
let O = function () { console.log('0') }
map.set(0,4)
cosnole.log(map.get(0)) // 4 
//键的顺序
//跟你添加到对象中数据的索引决定的
```



# ES5和ES6中对象的拷贝

```javascript
const target = {}
const source = { a:1, b: 2}
Object.assign(target, source) // 此API实行的是浅复制(对于不是引用类型的值，做数据替换。是引用类型的值，它不在遍历，直接替换地址)
console.log(target) // {a:1,b:2}
//ex
const target = {a : {b:1, e:5 } }
const source = {a : {c:5 ,b:2 } }
Object.assign(target, source)
console.log(target) // {a: {c:5,b:2}}
```



# 正则修饰符

```javascript
const s = 'aaa_aa_a'
const r1 = /a+/g
const r2 = /a+/y

console.log(r1.exec(s)) // 'aaa'
console.log(r2.exec(s)) // 'aaa'
console.log(r1.exec(s)) // 'aa'
console.log(r2.exec(s)) // null 
//y 粘连模式。连续的从上一次结束后的起始位置开始匹配


// 处理正则中文问题 
// unicode u修饰符 \uffff
let s = '𠮷' // (4个字节)两个字符的中文
let s2 = '\uD842\uDFB7' // UTF-16

console.log(/^\uD842/.test(s2)) // true 不应该匹配到
console.log(/^\uD842/u.test(s2)) // false 

console.log(/^./.test(s)) // false
console.log(/^./u.test(s)) // true 需要加u才能匹配到大于两个字节的字符

console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')) // true  想在正则表达式中使用unicode的码点识别字符，用/\u{码点值}/u

//关于量词
console.log(/𠮷{2}/.test('𠮷𠮷')) // false
console.log(/𠮷{2}/u.test('𠮷𠮷')) // true
// 到ES6，正则里有中文。加上u
console.log(/[a-z]/i.test('\u212A')) // false
console.log(/[a-z]/iu.test('\u212A')) //  true

```



##### ES6的Tag函数

```javascript
function Price(Strings, type) {
    let s1 = string[0]
    const retailPrice = 20
    const wholeSalePrcie = 16
    let showTxt
    if(type === 'retail') {
        showTxt = '购买单价是：' + retailPrice
    } else {
        showTxt = '购买单价是：' + wholeSalePrice
    }
    return `${s1}${showTxt}`
}

let showTxt = Price`您此次的${'retail'}`
console.log(showTxt)
```



# ES6解构

```javascript
// 数组解构
let arr = ['hello','word','next']
let [firstName,,thirdName] = arr
console.log(firstName,thirdName) // hello next
//由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
let {0:first,[arr.length -1]:last} = arr
first // 1
last // 3

// 对象
let user = { name: 's', surname: 't' }; //分号必须加
[user.name, user.surname] = [1,2]
console.log(user) // { name:1, surname:2 }

// 结构右边是可遍历的数据
let [firstName,,thirdName] = new Set([1,2,3,4])
console.log(firstName,thirdName) // 1,3

// 解构赋值的另一种形式
let user = {name: 's', surname:'t'}
for (let [k, v] of Object.entries(user)) {
    // 隐式赋值，显示索引
    console.log(k,v)
}

// Rest参数在解构中的使用	
let arr = [1,2,3,4,5,6,7,8,9]
let [fir,cur,...last] = arr
console.log(fir,cur,last) // 1,2

let arr = [] // let arr = [1]
let [fir,cur = 'hello',...last] = arr
console.log(fir,cur,last) // undefined undefined []; 1 hello []
```

```javascript
// 对象解构
let options = {
    title : 'menu',
    width: 100,
    height: 200
}

let {title:title2 ,width,height,yud=130} = options // 不简写，变量名要和Obj的属性一致
console.log(title2, width, height) // menu,100,200,300

let { title,...last } = options
console.log(title, last) // meu {width:100,height:200}


let options = {
    size: {
        width: 100,
        height: 200
    },
    item: ['Cake','Donut'],
    extra: true
}
let { size:{width,height},item:[item1],extra } = options
console.log(width,height,item1) // 100 200 'Cake' true

// 对象的解构赋值可以取到继承的属性
const obj1 = {}
const obj2 = { foo:'bar' }
Object.setPrototypeOf(obj1,obj2) // 对象的obj1的原型对象是obj2。
const { foo } = obj1
foo // 'bar' 
```

```javascript
//字符串
const [a,b,c] = 'hello'
a // 'h'
b // 'e'
c // 'l'
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
let {length:len} = 'hello'
len // 5
```



# ES5回调地狱和ES6-Promise

>  JS是单线程，异步操作不会立马执行，而是放到异步队列中。要先执行同步操作，执行完再执行异步操作
```javascript
// callback
function loadScript (src,callback) {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => {callback(src)}
    document.head.append(script)
}
loadScript('./1.js',function(script) {
    loadScript('./2.js',function(script) {
        loadScript('./3.js',function(script) {})
    })
}) // 1 2 3

function loadScript (src) {
    return new Promise((resolve,reject) => { // pending,undefined
        let script = document.createElement('script')
    	script.src = src
        script.onload = () => resolve(src) // fulfilled,result
        script.onerror = (err) => reject(err) // rejected,error
        document.head.append(script)
    })
}
loadScript('./1.js').then(loadScript('./2.js')) // 1 2
```
> **then的语法**
>
> 1. .then是Promise对象原型上面的方法
> 2. promise.then( onFulfilled, onRejected )  // (第一个必选，第二个可选。均为函数类型)对应resolve和reject
> 3. 上面场景.then(loadScript('./2.js')) 里面的loadScript('./2.js')虽然被忽略，但是是表达式，就要计算表达式的值，就被执行，所有也能运行

```JavaScript
loadScript('./1.js').then(() => {
    loadScript('./2.js')
}, (err) => {
    console.log(err)
})
.then(() => {
    loadScript('./3.js')
}, (err) => {
    console.log(err)
})

// Promise提供了两个静态方法

function test (bool) {
    if(bool) {
        return new Promise()
    } else {
        // return 42   只有promise对象才可以.then
        return Promise.resolve(42)
        return Promise.reject(new Error('ss')) // test(1)
    }
}
test(0).then((value) => {
    console.log(value) // 42
})
test(1).then((value)=> {
    console.log()
}, (err) => {
    console.log(err) // ss
})


```
> **Promise对错误的处理**

```JavaScript
function loadScript(src) {
  return new Promise((resolve, reject) => { // pending,undefined
    let script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(src) // fulfilled,result
    script.onerror = (err) => reject(err) // rejected,error
    document.head.append(script)
  })
}

loadScript('./5.js')
  .then(() => {
    return loadScript('./2.js')
  }).then(() => {
    return loadScript('./3.js')
  })
  .catch(err => {
    console.log(err)
  })
// catch也是promise原型对象上的方法,捕获的是链式操作上rejected抛出的错误(改变了promise状态)
// 不要用 throw new Error 去触发 catch
```
> Promise.all  ---并行异步操作
```javascript
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.resolve(3)

Promise.all([p1, p2, p3]).then(res => {
  console.log(res) // [1,2,3]
})
```

> Promise.race  ---静态方法

```javascript

const p1 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(function () {
            resolve(1)
        }, 1000)
    })
}
const p2 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(function () {
            resolve(2)
        },0)
    })
}
Promise.race([p1(),p2()]).then(res => {
    console.log(res)  // 2
})
```



# 反射 Reflect

```javascript
console.log(Math.floor.apply(null, [3.72])) // 3
console.log(Reflect.apply(Math.floor,null, [4.72]))  // 4

//先执行方法， 反射是执行过程中再决定用哪个方法，
//ex:
let price = 91.5
if(price > 100) {
    price = Math.floor.apply(null, [price])
} else {
    price = Math.ceil.apply(null , [price])
}
console.log(price) // 92
// 用反射
console.log(Reflect.apply(price > 100 ? Math.floor : Math.ceil,null,[price])) // 92

// 类的实例化
let d = new Date()
console.log(d.getTime()) // 1556755471
// 用反射代替new，实例化对象
let d = Reflect.construct(Data, []) // construct 构造函数，不加参数必须传递一个空数组
console.log(d.getTime(),d instanceof Date)//instanceof判断一个实例对象是不是这个类的实例

// 反射定义一个新属性
const student = {}
const r = Reflect.defineProperty(student, 'name', {value:'Nick1'})
student,r // {name: 'Nick1'} true  结果返回的是true/false
const r = Object.definProperty(student, 'name', {value: 'Nick2'})
student,r // {name: 'Nick2'} {name: 'Nick2'} 结果返回的是一个对象

// 反射读取、写入和删除对象上的属性
const obj = {x:3,y:2}
Reflect.deleteProperty(obj, 'x')
obj // {y:2}
Reflect.get(obj, 'x') // 3
Reflect.getOwnPropertyDescriptor(obj.'x') //读取该属性的值和属性描述符 {value: 3, writable: true, enumerable: true, configurable: true}
Reflect.set(obj,'z',4)
obj // {x: 1, y: 2, z: 4}

const arr = ['duck', 'duck', 'duck']
Reflect.set(arr, 2 , 'goods')
console.log(arr); // ["duck", "duck", "goods"]

// 查看此实例对象上的原型对象上的东西
let d = new Date()
Reflect.getPrototypeOf(d)
Object.getPrototypeOf(d)

// Reflet验证一个对象是否包含此属性
const obj = { x:1, y:2 }
Reflect.has(obj,'y') //true    apply ,has ,construct。Object上没有而Reflect上有

// 判断一个对象是否可扩展
const obj = {x:1,y:2}
obj.z = 3
Obj.freeze(obj) // 冻结obj对象
Reflect.isExtensible(obj) // false

//设置对象禁止扩展
const obj = {x:1,y:2}
Reflect.preventExtensions(obj) // 禁止对象扩展
Reflect.isExtensible(obj) // false

// 修改原型对象
const arr = ['duck', 'duck', 'duck']
Reflect.getPrototypeOf(arr) // 返回arr的原型对象
Reflect.setPrototypeOf(arr,String.prototype)
// arr.sort() 报错
Reflect.getPrototypeOf(arr) // 返回新设置的原型对象
```



#  代理：Proxy

```javascript
let o = {
    name: 'xiao ming',
    price: 190
}
// Proxy
let d = new Proxy(o, {
    get(trage, key) {
        return trage[key]
    },
    set(trage, key, value) {
        return false
    }
})
d.price = 300
console.log(d.price, d.name) // 190 xiao ming

// ES5的方法
for(let [key] of Object.entries(o)) { 
    //Object.entries 可以把一个对象的键值以数组的形式遍历出来
    Object.defineProperty(o,key, {
        writable: false // 是否可以被赋值
    })
}
o.price = 300
console.log(o.name, o.price)
```

```JavaScript
// 校验
let o = {
    name: 'xiaoming',
    price： 190
}
let d = new Proxy(o, {
    get(trage,key) {
        return trage[key] || ''
    },
    set(trage,key,value) {
        if(Reflect.has(trage, key)) {
            if(key === 'price') {
                if(value > 300) {
                    retrun false
                } else {
                    trage[key] = value
                }
            } eles {
                trage[key] = value
            }
        } else {
            return false
        }
    }
})
d.price = 301 // 190
d.name = 'hanmeimie' 
d.age = 400 // ''

// 解耦的写法
window.addEventListener('error', (e) => {
   console.log(e.message);
    // report('./')
}, true)

let valdator = (trage, key, value) => {
    if (Reflect.has(trage, key)) {
    if (key === 'price') {
      if (value > 300) {
        return false
      } else {
        trage[key] = value
      }
    } else {
      trage[key] = value
    }
  } else {
    return false
  }
}
let d = new Proxy(o, {
    get(trage, key) {
        return trage[key] || ''
    },
    set: valdator
})
```

```javascript
// 使用代理做到 id只读且唯一，不能被修改
class Component = {
    construction() {
        this.proxy = new Proxy({
            id: Math.random().toString(36).slice(-8)
        })
    }
    get id() { // 只读
        return this.proxy.id
    }
}
com.id = abc // 不起作用
let com = new Component() // tcaadoav 
let com2 = new Component() // pt8zw878

// 可撤销的代理操作
let o = {
  name: 'xiaoming',
  price: 190
}
let d = Proxy.revocable(o, {
  get(trage, key) {
    if(key === 'price') {
      return trage[key] + 20
    } else {
      return trage[key]
    }
  },
})
d.proxy.price,d // 210 {proxy: Proxy, revoke: ƒ}
setTimeout(() => {
  d.revoke() // 撤销以后，代理数据将无法被读取到
  setTimeout(() => {
    console.log(d.proxy.price);
    //Cannot perform 'get' on a proxy that has been revoked
  },100)
},1000)
```



# Generator 函数的语法

> 调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，下一步必须调用遍历器对象的next()方法，是指针移向下一个状态

```javascript
function * loop() {
    for (let i = 0; i < 5; i++) {
        yield console.log(i)
    }
}
const l =loop()
l.next() // 0
l.next() // 1
l.next() // 2

function * gen () {
  let val
  val = yield 1
  console.log(val)
}
const l = gen()
l.next()
l.next()  // undefined  yield是没有返回值的

//-> 需要深化理解一下 
function * gen () {
  let val
  val = yield * [1,2,3] // yield加*以后，表示的是可遍历的对象(可迭代的对象)
  console.log(val)
}
const l = gen()
console.log(l.next()) // {value: 1, done: false}
console.log(l.next()) // {value: 2, done: false}

// next传值进入函数
function * gen () {
  let val
  val = yield [1,2,3] // yield加*以后，表示的是可遍历的对象(可迭代的对象)
  console.log(val) // 20
}
const l = gen()
console.log(l.next(10))  // {value: Array(3), done: false}
console.log(l.next(20))  // {value: undefined, done: true}

//EX:Generator函数的应用场景
//ES5实现抽奖
function draw(first = 1, second = 3, third = 5) {
  let firstPrize= ['1A','1B','1C','1D','1E']
  let secondPrize= ['2A','2B','2C','2D','2E','2F','2G','2H','2I']
  let thirdPrize= ['3A','3B','3C','3D','3E','3F','3G','3K','3I','3F','30']
  let result = []
  let random
  // 抽一等奖
  for (let i = 0; i < first; i++) {
    random = Math.floor(Math.random() * firstPrize.length)
    result = result.concat(firstPrize.splice(random, 1)) 
  }
  // 抽二等奖
  for (let i = 0; i < second; i++) {
    random = Math.floor(Math.random() * secondPrize.length)
    result = result.concat(secondPrize.splice(random, 1)) 
  }
  // 抽三等奖
  for (let i = 0; i < third; i++) {
    random = Math.floor(Math.random() * thirdPrize.length)
    result = result.concat(thirdPrize.splice(random, 1)) 
  }
  return result
}
let t = draw()
for ( let value of t) {
  console.log(value); //一次全都出来了
}

//ES6使用Generator
function* draw(first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E']
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I']
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3K', '3I', '3F']
  let count = 0
  let random
  // 抽一等奖
  while (1) {
    if (count < first) {
      random = Math.floor(Math.random() * firstPrize.length)
      yield firstPrize[random]
      count++
      firstPrize.splice(random, 1)
    } else if (count < first + second) {
      random = Math.floor(Math.random() * secondPrize.length)
      yield secondPrize[random]
      count++
      secondPrize.splice(random, 1)
    } else if (count < first + second + third) {
      random = Math.floor(Math.random() * thirdPrize.length)
      yield thirdPrize[random]
      count++
      thirdPrize.splice(random, 1)
    } else {
      return false
    }
  }
  return result
}
let d = draw()
console.log(d.next().value)
console.log(d.next().value)

//应用场景2
function* count(x = 1) {
  while (1) {
    if (x % 3 === 0) {
      yield x
    }
    x++
  }
}
let num = count()
console.log(num.next().value)

// 用Generator实现斐波那契数列
function * series() {
    let [x, y] = [0, 1]
    while(1) {
        [x, y] = [y, x+y]
        yield y
    }
}
let ts = series()
console.log(ts.next().value) // 1
console.log(ts.next().value) // 2
console.log(ts.next().value) // 3
```

# 遍历器接口

> 输入是固定的，输出是有约束的，中间无所谓
> 什么是可迭代协议-> 必须要有以Symbol.iterator为key的方法(没有就是不可迭代
> 什么是迭代器协议->既然它可以迭代，它是怎样的一个迭代过程，这就是迭代器。要求必须返回一个对象，无参数且命名为next，next的返回值必须是done和value
```javascript
let authors = {
  allAuthors: {
    fiction: ['Agla', 'Skks', 'Lp'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    fantasy: ['J.R.Tole', 'J.M.R', 'Terr P.K']
  },
  Addres: []
}
// 遍历器接口
anthors[Symbol.iterator] = function () {
    // this 指对象本身
    let allAuthors = this.allAuthors
    let keys= Reflect.ownkeys(allAuthors)
    let values = []
    return {
        next() {
            if(!values.length) {
                if(keys.length) {
                    values = allAuthors[key[0]]
                    keys.shift()
                }
            }
            return {
                done: !values.length, // 遍历是否结束
                value：values.shift() // 当前所遍历项的值
            }
        }
    }
}
let r = []
for (let v of authors) {
    r.push(v)
}
console.log(r)

```







