# Vue中API学习笔记

Vue中的数据和DOM已经被关联起来，所有的东西都是响应式的。注意我们不再和HTML直接交互。一个Vue应用会将其挂载到DOM元素上然后对齐进行完全的控制，那个HTML是我们的入口，但是其他的都会发生在新创建的Vue实例内部。详情可见[MVVM原理极其实现](https://github.com/dingxingxing/Storage-of-record-documents/tree/master/Vue)。



## Vue实例
### 1、实例声明周期钩子函数

8个声明周期函数



## 模板语法

### 1、插值

①、 [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。

②、可以使用js表达式但是不能使用语句和流控制(if判断语句)

```js
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}

<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```



### 2、指令

①、动态参数 -2.60新增

可以使用动态参数为一个动态的事件名绑定处理函数：

约束：为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。会触发警告。

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

> 当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus 



### 3、修饰符

在移动端最好的应用就是

①、 .stop   阻止事件冒泡

②、 .prevent   （@touchmove.prevent 禁止底层页面滑动）



## 计算属性和侦听器

模板中不应该放入过多的逻辑，会让模板过重且难以维护，所以对于任何复杂逻辑，都应该使用**计算属性**。

### 基础例子



```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
// Original message: "Hello"

// Computed reversed message: "olleH"
```

> 我们声明了一个计算属性 reversedMessage。Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 vm.message 发生改变时，，所有依赖 `vm.reversedMessage` 的绑定也会更新。



###  计算属性缓存 vs 方法

我们通过表达式中调用方法可以同样达到效果：

```HTML
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存**。只在相关响应依赖发生改变时它们才会重新计算求值。这就意思只要message还没有改变，多次访问reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数

注：这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

如你不希望有缓存，请用方法来替代。



### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。

但是有些时候可以使用computed代替watch



### 计算属性的 setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

> 现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

### 侦听器

当数据变化要执行异步或者开销较大的操作，watch 是最有用的选择。



## Class于Style绑定

### 绑定HTML Class

#### 对象语法

①、我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```html
<div v-bind:class="{ active: isActive }"></div>
```

> 是否渲染取决于isActive是 true或false



②、你可以在对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class attribute 共存。当有如下模板：

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

```

```js
// data定义如下
data: {
  isActive: true,
  hasError: false
}

// 渲染结果
// <div class="static active"></div>
```



③、绑定的数据对象不必内联定义在模板里：

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```



④、这是一个常用且强大的模式，我们也可以在这里绑定一个返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)：

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```



#### 数组语法

①、我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
// 渲染为：
// <div class="active text-danger"></div>
```



②、 数组语法中也可以使用对象语法：

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```



#### 用在组件上

当在一个自定义组件上使用 `class`  时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

你声明了这个组件：

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

```html
<!-- 在使用它的时候添加一些 class： -->
<my-component class="baz boo"></my-component>

<!-- HTML 将被渲染为： -->
<p class="foo bar baz boo">Hi</p>
```





### 绑定内联样式

#### 对象语法

> `v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- 直接绑定到一个样式对象通常更好，这会让模板更清晰： -->
<div v-bind:style="styleObject"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}

// 绑定对象
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

#### 多重值

> 从 2.3.0 起你可以为 `style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```



## 条件渲染

### 在<template>元素上使用v-if条件渲染分组

> 因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else-if v-else 

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。



### 用key可以管理可复用的元素

> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。



这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

现在，每次切换时，输入框都将被重新渲染。

### v-for和v-if

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。

```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

> 当 Vue 处理指令时`v-for` 比 `v-if` 具有更高的优先级，哪怕我们只渲染出一小部分用户数据的元素，也得在每次重新渲染的时候遍历整个列表，不论活跃用户是否发生变化，应该使用计算属性

