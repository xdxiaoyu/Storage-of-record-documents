## ES6入门

------

##### 1、let和const命令

```JavaScript
{
  let a =10;
  var b = 1;
}
console.log(a); // ReferenceError: a is not defined
console.log(b); // 1
```



let声明只在它所在的代码块有效，且不能重复定义

```JavaScript
// 用 var
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  }
}
a[6]() // 10  i是全局变量，每次循环都会改变i的值。循环结束,a数组中console.log(i)中的i也是全局的i，全局的i最后结果为10

//用 let
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  }
}
a[6]() // 6  当前的i只在本轮的循环生效，我也好奇为啥每次重新声明新创建一个i，之前的i咋弄！书本给出的解释是：JavaScript引擎内部会记住上一轮的变量i
```



for循环还有一个特别之处，设置循环变量的那部分是父级作用域，循环体是子集作用域

```JavaScript
for( let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i);
}
//abc
//abc
//abc
```



暂时性死区：
​	ES6规定，如果区块中存在let或const，那他们申明变量之前的那段区域被称为“暂时性死区”，在他们申明之前，该变量都是不可用的。

```JavaScript
var tmp =123

if(true) {
  // TMD 开始
  tmp = "abc" // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp // TMD结束
  console.log(tmp); // undefined
  
  tmp = 123
  console.log(tmp); // 123
}
// 在let命令声明变量之前，都属于变量tmp的死区
```



暂时性死区的本质就是，一进入当前作用域，变量就已经存在了，但是不可获取，必须要等到声明变量的那行代码出现，才可以被获取使用；有些“死区”比较隐蔽，不容易发现，例如：

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错 y is not defined
// 因为y没有声明，属于“死区”，所以报错

let 与 var 的行为不同

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```



##### 2、作用域

JavaScript采用词法作用域，也就是静态作用域。与之对应的就有动态作用域。
```JavaScript
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();  //结果？？？
```
静态作用域：
执行foo()函数，foo()函数内部查找是否有value，如果没有，就根据函数书写的位置查找上一层的代码，所以value是1.

动态作用域：
执行foo()函数，foo()内部没有找到value，就从调用函数的位置的作用域往上查找，所以value是2.

因为JavaScript是词法作用域（静态作用域），所以运行结果为 1。！！！



再看《JavaScript权威指南》给出的两个例子：

```javascript
//one:
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

//tow:
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
//两个函数执行的结果是多少???
```

引用《JavaScript权威指南》的回答就是：
JavaScript函数的执行用到了作用域链，这个作用域链是在函数定义时创建的。嵌套函数fn()定义在这个作用域里，其中的变量scope一定是局部变量，不管何时何地的执行函数fn()，这种绑定在执行fn时任然有效。

>  写到这我想到了闭包的实现，返回出来的函数携带了在父元素内创建的变量。为什么可以携带，鄙人认为可以用词法作用域(静态作用域)去解释。无论何时何地去调用返回出来的函数，执行到作用域时都在定义函数的位置往上去查找。如果函数体有用到父元素定义的变量，就找到了。等同于我理解的携带。
