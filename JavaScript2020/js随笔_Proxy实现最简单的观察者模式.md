# Proxy

```javascript
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
//上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为
obj.count = 1 // setting count
++obj.count // getting count 、 setting count
```



**ES6原生提供Proxy构造函数，用来生成Proxy实例**

```javascript
var proxy = new Proxy(target, handler)
```
>  Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为



```javascript
var proxy = new Proxy({}, {
  get: (target, propkey) => {
    return 35
  }
})

console.log(proxy.time) // 35 
console.log(proxy.name) // 35
console.log(proxy.title) // 35
```

> 上述代码，作为构造函数，Proxy接受两个参数。第一个参数是所要代理的目标对象（上述是一个空对象），即如果没有Proxy的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个get方法，用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都得到35.



# 使用Proxy实现最简单的观察者模式 

```javascript
const person = observable({
    name: '张三',
    age: '20'
})

function print() {
    console.log(`${person.name}, ${person.age + 2}`)
}

observe(print)
person.name = '李四'

// 输出  
// 李四 '20'
```

> 上面代码中，数据对象person是观察目标，函数print是观察者，一旦数据对象发生变化，print就好自动执行



> 下面代码使用Proxy写一个观察者模式最简单的实现，即实现observable和observe两个函数	思路是obersvable函数返回一个原始对象的Proxy代理，拦截赋值操作，触发充当观察者的各个函数

```javascript
const queuedObservers = new Set()

const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(Obj, {set})

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queuedObservers.forEach(observe => observe())
    return result
}
```

> 上面代码先定义一个set集合，所有观察者函数都放进这个集合。然后observable函数返回原始对象的代理，拦截赋值操作，拦截函数set之中，会自动执行所有观察者