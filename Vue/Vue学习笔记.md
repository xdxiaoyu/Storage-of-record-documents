# Vue必会的基础知识

Vue中的数据和DOM已经被关联起来，所有的东西都是响应式的。注意我们不再和HTML直接交互。一个Vue应用会将其挂载到DOM元素上然后对齐进行完全的控制，那个HTML是我们的入口，但是其他的都会发生在新创建的Vue实例内部。详情可见[MVVM原理极其实现](https://github.com/dingxingxing/Storage-of-record-documents/tree/master/Vue)。



**下面是Vue的一些基本知识点相关学习跟应用，差缺补漏吧。Vue.js官网好好看一遍还是很香的。**

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



## 列表渲染

### v-for

在v-for中，既可以使用数组也可以使用对象



### 状态维护

当Vue正在更新使用v-for渲染列表时，它默认使用“就地更新策略”。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每一个元素，并确保它们在每个位置索引位置正确渲染。

> 不要使用对象或数组之类的非基本类型值作为v-for的key。请用字符串或数值型的值。

key的特殊主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用key时，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素





## 事件处理

### 内联处理器的方法

有时也需要在内联语句处理器中访问原始的DOM事件。可以使用特殊变量$event把它传入方法：

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```



### 事件修饰符

以上方法虽然可以实现，但是更好的方式是：**方法只有纯粹的数据逻辑，而不是去处理DOM事件细节**。为了解决这个问题，Vue提供了事件修饰符。

​	

```js
.stop  // 等同于js中的event.stopPropagation(),防止事件冒泡 
.prevent // 取消默认事件，比如a标签的链接跳转
.caputer // 捕获事件，点击子节点，由外到内父节点->子节点触发点击事件（不加是由内到外）
.self // 只触发自己范围内的事件，不会包含子元素
.once // 只执行一次点击
```

```js
.passive
```

> 【浏览器只有等内核线程执行到事件监听器对应的JavaScript代码时，才能知道内部是否会调用preventDefault函数来阻止事件的默认行为，所以浏览器本身是没有办法对这种场景进行优化的。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿。】
>
> 通俗点说就是每次事件产生，浏览器都会去查询一下是否有preventDefault阻止该次事件的默认动作。我们加上passive就是为了告诉浏览器，不用查询了，我们没用preventDefault阻止默认动作。





## 表单输入绑定

### 修饰符

#### .lazy

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">

<!--注：ElementUI的input输入框不支持 `v-model` 修饰符-->
```



#### number

可以自动将用户输入的值转换成数值类型：

> 只有这个值无法被 parsenFloat()解析，则会返回原始的值

```html
<input v-model.number="age" type="number">
```



#### .trim

过滤用户输入的收尾空白字符：

```html
<input v-model.trim="msg">
```





## 组件基础

### 通过Prop向子组件传递数据

#### 传入一个对象的所有property

> 如果想将一个对象的所有property都作为prop传入，可以不用每个参数分别使用v-bind

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板

```html
<blog-post v-bind="post"></blog-post>

<!-- 等价于 -->
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```



### 单向数据流

所有的prop传值都让父子prop之间形成一个**单行下行绑定**。每次父组件发生变更时，子组件中所有的prop都将会刷新为最新的值，这说明你不应该在子组件内部改prop（强行做，Vue会有警告）

> 注：JavaScript中数组和对象是通过引用传入的，对于一个数组或对象类型的prop来说，在子组件中改变变更这个对象的本身将会影响父组件的状态



## Prop验证

```js
Vue.component('my-component', {
    props: {
        // 基础的类型检查（'null' 和 'undefined'会通过任何类型的验证
        propA: Number,
        // 多个类型
        propB: [Number, String]
        // 必填字符串
        propC: [
        	type: String,
        	required: true
        ]
    }
})
```



## 自定义事件

**始终使用 kebab-case 的事件名**。



## 插槽

### 编译作用域

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

### [具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#具名插槽)

### [作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)





## 混入

### [基础](https://cn.vuejs.org/v2/guide/mixins.html#基础)

> 混入(mixin)提供了一种非常灵活的方式，来分发Vue组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项

### [选项合并](https://cn.vuejs.org/v2/guide/mixins.html#选项合并)

当组件和混入对象有同名选项是，
数据对象在内部会进行递归合并，并且在发生冲突时以组件数据优先

```javascript
var mixin = {
    data() {
    	return {
            message: 'hello',
            foo: 'abc'
        }
	}
}

new Vue({
    mixin: [mixin],
    data() {
        return {
            message: 'goodbye',
            bar: 'def'
        }
    },
    created() {
        console.log(this.$data)
        // => {message: 'goodbye', foo:'adc', bar: 'def'}
    }
})
```



同名钩子函数将合并为一个数组，因此都将被调用。只是混入对象的钩子将在组件自身钩子**之前**调用

值为对象的选项，例如methods、components和directives，将别合并成同一个对象。**两个对象键名冲突时，取组件对象的键值对**。



### 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想要自定义选项以自定义逻辑合并，可以向 **`Vue.config.optionMergeStrategies`**添加一个函数



## 自定义指令

### [钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数)

### [钩子函数参数](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数参数)

### [动态指令参数](https://cn.vuejs.org/v2/guide/custom-directive.html#动态指令参数)

### 对象字面量

如果指令需要多个值，可以传入一个JavaScript对象字面量。指令函数可以接受所有合法的JavaScript表达式

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```javascript
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```





## 渲染函数 & JSX 

看懂百分之30%，过段时间再看 



## 路由

### 编程式导航和声明式导航

```js
//  声明式
<router-link :to="....">

// 编程式
router.push(...)
// ex:       
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```



### 导航守卫

#### [全局前置守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

router.beforeEach

#### [全局解析守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

router.beforeResolve

#### [全局后置钩子](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

```js
router.afterEach((to, from) => {
  // ...
})
```

#### 路由独享守卫

```js
 beforeEnter: (to, from, next) => {
        // ...
 }
```



#### 组件内的守卫

① beforeRouteEnter

② beforeRouteUpdate

③ beforeRouteLeave

```js
 beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建。
     next(vm => {
         // 通过`vm`访问组件实例
     })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转		的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调		用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

#### 完整的导航解析流程

1.导航被触发。
2.在失活的组件里调用 `beforeRouterLeave`守卫。
3.调用全局的 `beforeEach`守卫。
4.在重用的组件里调用 `beforeRouterUpdate`守卫。
5.在路由配置里调用 `beforeEnter`。
6.解析异步路由组件。
7.在被激活的组件里调用 `beforeRouterEnter`。
8.调用全局的 `beforeResolve`守卫。
9.导航被确认。
10.调用全局 `afterEach`钩子。
11.触发DOM更新。
12.用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next`的回调函数。



## Vuex

### State

> state 提供唯一的公共数据源。所有共享的数据要统一放到Store的State中进行储存

组件访问State中数据的第一种方式：

```js
this.$store.state.全局数据名称
```

组件访问State中数据的第二种方式：

```js
// 1.从Vuex中按需导入`mapState`函数
import { mapState } from 'vuex'

// 2.将全局数据，映射为当前组件的计算属性
computed: {
    ...mapState(['count'])
}
```



### Mutation

> Mutation用于变更Store中的数据。

① 只能通过muntation变更Store数据，不可以直接操作Store中的数据。

② 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。

```js
// 定义motation
mutations: {
    add(state) {
        // 变更状态
        state.count++
    }，
    // 传参
    addN(state,n) {
        state.count+=n
    }
}

//组件中触发mutation
methods: {
    handle() {
        // 触发mutations 的第一种方式
        this.$store.commit('add')
        // 触发mutations传参
        this.$store.commit('addN', 3)
    }
}
```



this.$store.commit()是触发mutations的第一种方式，触发mutations的**第二种方式**:



```js
// 1.从vuex中按需导入`mapMutations`函数
import { mapMutations } from 'vuex'

// 2.将指定的 mutations函数，映射为当前组件的 methods函数
methods: {
    ...mapMutations(['add','addN'])
}
```



### Action

> Action用于处理异步任务。

如果通过异步变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据。

```js
// 定义Action
actions: {
    // context 第一个形参可以理解为当前new 的实例
    addAsync(context,n) {
        setTimeout(() => {
            context.commit('addN',n)
        },1000)
    }
}

// 触发Action
methods: {
    handle: {
        // 触发actions 的第一种方式
        // 携带参数
        this.$store.dispath('addAsync', 5)
    }
}
```



this.$store.dispatch()是触发actions的第一种方式，触发actions的**第二种方式**：

```js
// 1.从vuex中按需导入`mapActions`函数
import { mapActions } from 'vuex'

// 2.将指定的actions函数，映射为当前组件的methods函数
methods: {
    ...mapActions(['addAsync', 'addNAsync'])
}
```



### Getter

> Getter用于对Store中的数据进行加工处理形成新的数据。

① Getter可以对Store中已有的数据加工处理之后形成新的数据，类似Vue的计算属性

② Store中数据发生变化，Getter的数据也会跟着变化。

```js
// 定义Getter
const strore = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        showNum: state => {
            return '当前最新的数量是【'+ state.count +'】'
        }
    }
})
```

使用getters的第一种方式：

```js
this.$store.getters.名称
```

使用getters的第二种方式：

```js
import { MapGetters } from 'vuex'

computed: {
    ...mapGetters(['showNum'])
}
```



### namespaced

这个属性是用来解决不同模块命名冲突的问题：

```js
// 不同页面引入getter、actions、mutations时，要加上模块名
// ex
...mapGetters('BadInfo', ['DialogDate'])

// 第二种写法
this.$store.commit('XXX/SETXXX',sth);
this.$store.getters['XXX/getXXX'];
```













































