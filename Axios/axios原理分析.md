# Axios

**Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中。**

文档地址:<https://github.com/axios/axios>

## axios理解和使用

### 1.请求配置

```javascript
{
    // 请求服务器的URL
    url: '/user',
    
    // method 创建请求使用的方法
    method: 'get'
    
    // baseURL 将自动加早url前面，除非 url 是一个绝对url
    baseURL: 'https://some-domain.com/api/'
    
    // 'transformRequest' 允许向服务器发送前，修改请求数据
    // 只能用在 PUT, POST 和 PATH 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或ArrayBuffer,或 Stream
    transformRequest: [function(data, headers) {
        // 对 data 进行任意转换处理
        return data;
    }]
    
    //	'transformResponse' 在传递给 then/catch前， 允许修改响应数据
    transformResponse:[function(data) {
        // 对 data 进行任意转换处理
        return data
    }]
    
    // 'headers' 是即将被发送的自定义请求头
    headers: {	'X-Requested-With': 'XMLHttpRequest' }
    
    // 'params' 是即将与请求一起发送的URL参数
    // 必须是一个无格式对象(plain object) 或 URLSearchParams对象
    params: {
        ID: 12345
    }
    
    // 'paramsSerializer'是一个负责 'params' 序列化的函数
    paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
    
    // 'data' 是作为请求主体被发送的数据
    // 只适用于这些请求方法 PUT POST PATHCH
    // 在没有设置 `transformRequest` 时， 必须以下类型之一：
   	// - string,plain object, ArrayBuffer,ArrayBufferView,URLSearchParams
    // - 浏览器专属： FormData, File, Blob
    // - Node 专属： Stream
    data: {
        firstName: 'Fred'
    }
    
    // 指定请求超时的毫秒数(0表示无超时时间)
    // 请求超时，请求将被中断
    timeout: 1000
    
    // 'withCreadentials' 表示跨越请求时是否需要使用凭证
    withCreadentials: true, // default -> false
    
    // 'adapter' 允许自定义处理请求，以使测试更轻松
    adapter: function(config) {
    	/* */
    }    
    
    // 'auth' 表示应该使用 HTTP 基础验证，并提供凭证
    // 这将设置一个'Authorization' 头，覆写掉现有的任意使用'hedaers'设置的自定义'Authorization'
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    }
    
    //  'responseType' 表示服务器响应的数据类型， 可以是 'arraybuffer', 'blob', 'document', 'json'
    responseType: 'json',
    
    // 'xsrfCookieName' 是作用于xsrf token 的值得cookie的名称
    xsrfCookieName: 'XSRF-TOKEN'
    
    // 'onUploadProgress' 允许为上传处理进度事件
    onUploadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
    }
    
    // 'onDownloadProgress' 允许为下载处理进度事件
    onDownloadProgress: function(progressEvent) {
        // 对原生进度事件的处理
    }
    
    // 'maxContentLength' 定义允许的响应内容的最大尺寸
    maxContentLength: 2000
    
    // 'validateStatus' 定义对于给定的HTTP响应状态码是resolve 或 reject promis
    validateStatus: function(status) {
        return status >=200 && status <300
    }
    
    // 'maxRedirects' 定义在node.js中 follow的最大重定向数目
    // 如果设置为0， 将不会 follow 任何重定向
    maxRedirects: 5， // default
    
    // 'proxy' 定义代理服务器的主机名称和端口
    // 'auth' 表示HTTP 基础验证应当用于连接代理，并提供凭证
    // 这将会设置一个 'Proxy-Authorization'头，覆盖掉已有的通过使用`header`设置的自定义
    proxy: {
        host: '127.0.01',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    }
    
    // 'cancelToken' 指定用于取消请求的 cancel token
    cancelToken: new CancelToken(function(cancel) {
        
    })
}
```

### 2.响应结构

某个请求的响应包含以下信息

```javascript
{
    // 'data' 由服务器提供的响应
    data: {}
    
    // 'status' 来自服务器响应的 HTTP 状态信息
    status: 200,
        
     // 'statusText' 来自服务器响应的HTTP 状态信息
     statusText: 'OK'
    
    // 'headers' 服务器响应的头
    headers: {}
    
    // 'config' 是为请求提供的配置信息
    config: {}
    
    request: {}
}
```



### 3.axios特点

1.基于promise的异步ajax请求库。

2.浏览器端/ node端都可以使用。

3.支持请求/ 响应拦截器。

4.支持取消请求。

5.请求/ 响应数据转换。

6.批量发送多个请求。



### 4.axios.create(config)

1.根据指定配置创建一个新的axios，也就是每个新axios都有自己的配置

2.新axios只是没有取消请求和批量发请求的方法，其他所有语法都是一致的

3.为什么要设计这个语法？

​	(1) 需要：项目中有部分按接口需要的配置与另一部分接口需求的配置不太一样，如何处理？

​	(2) 解决：创建2个新axios，每个人都有特有的配置，分别应用到不同要求的接口请求中



### 5.axios的处理链流程

```js
// 添加请求拦截器（回调函数） -> 后添加先执行
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
```

### 6.取消请求

```js
let cancel  // 用于保存取消请求的函数
getProducts() {
    // 准备发请求前，取消未完成的请求
	if( typeof cancel === 'function' ) {
    	cancel('取消请求')
	}
	axios({
    	url: 'http://localhost:8000/products1',
    	cancelToken: new axios.CancelToken((c) => { // c是用于取消当前请求的函数
    	// 保存取消函数，用于之后可能需要取消当前请求
    	cancel = c;
  	})
	}).then(
    	response => {
        	cancel = null
        	consoel.log('请求成功了')
    	},
    	error => {
        	if(axios.isCancel(error)) {
            	console.log('取消请求的错误')
        	} else { // 请求出错
            	cancel = null
        		console.log(error.message)
        	}    
    	}
	)
}

cancelReq() {
    if(type cancel === 'function') {
        cancel('强制取消请求')
    } else {
        console.log('没有可取消的请求')
    }
}
// 调用
cancelReq()
```



## axios源码阅读

### 1.文件目录

​	dist ->打包生成后的文件

​	examples -> 一些例子

​	lib -> 核心文件代码

​		adapters -> 请求相关的文件夹

​			http.js -> node服务端发送http请求

​			xhr.js -> 真正发请求的模块

​		Cancel -> 取消请求相关的文件夹

​			Cancel.js -> 定义的是Cancel构造函数

​			CancelToken.js -> 定义的是一个构造函数，执行取消相关的

​			isCancel.js -> 判断一个error是不是cancel类型错误

​		core -> 核心的一些东西

​			Axios.js -> Axios构造函数

​			dispathRequest.js -> 分发请求

​			InterceptorManager.js -> 拦截器相关

​		helpers ->工具模块

​	axios.js -> 向外暴露axios函数

​	defaults.js -> 默认配置相关的东西

​	index.js -> 外层的入口文件



### 2.axios与Axios的关系

①、从语法上来说：axios不是Axios的实例。

②、从功能上来说：axios是Axios的实例。（1.有自身的属性。2.有他原型链上的方法）

③、axios是Axios.prototype函数bind()返回的函数

④、axios作为对象有Axios原型对象上的所有方法，有Axios对象上所有属性

> 源码中axios.js文件

```js
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  // 等同于 Axios.prototype.request.bind(context)
  // bind返回一个新函数，这个新函数内部会调用这个request函数，
  // 简单的理解：axios函数最终找request执行
  // context是Axios的实例，一旦使用了request函数里面的this指向的就是Axios实例
  var instance = bind(Axios.prototype.request, context); // axios

  // 将Axios原型对象上的方法拷贝到 instance上：request()/get()/post()/put()/delete()
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  //  将Axios实例对象上的属性拷贝到instance上：defaults和interceptors属性
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

```



### 3.instance与axios的区别？

**1.相同：**

（1）都是一个能发任意请求的函数： request(config)

（2）都有发特定请求的各种方法：get()/post()/put()/delete()

（3）都有默认配置和拦截器属性：defaults/interceptors

**2.不同：**

（1）默认匹配的值很可能不一样

（2）instance没有axios后面添加的一些方法：create()/CancelToken()/all()

> 源码中axios.js文件

```js
// Factory for creating new instances
axios.create = function create(instanceConfig) {
  // 还是调用了createInstance方法，跟上面一样再走里面一遍
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
// 不一样的地方是axios添加了这些，而axios.create并没有添加这些操作
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
```

### 4.axios运行的整体流程？

**主要流程：**

> request(config)  == > dispatchRequest(config)  ===> xhrAdapter(config)

**request(config)：**

将请求拦截器 / dispatchRequest() / 响应拦截器 通过promise链串起来，然后promise

**dispatchRequest(config) :**

转换请求数据 ===> 调用xhrAdapter()发请求 ===> 请求返回后转换响应数据.返回promise

**xhrAdapter(config):**

创建XHR对象，根据config进行相应设置，发送特定请求，并接收响应数据，返回promise。



axiso流程图：

<img src="D:\exces\文档存放区\Storage-of-record-documents\Axios\axiso.png" alt="axiso"  />

> 源码Axios文件
>
> Promise通过它的链使用将请求拦截器，发请求的操作，响应拦截器，以及我们的最厚请求的成功失败串联起来

```js
/**
 * 主要用于发请求的函数
 * 我们使用的axios就是此函数bind()返回的函数
 * 
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  ------
  // Promise通过它的链使用将请求拦截器，发请求的操作，响应拦截器，以及我们的最厚请求的成功失败串联起来

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  // 找到所有的请求拦截器函数，后添加的请求拦截器保存在数组的前面
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // 后添加的响应拦截器保存在数组后面
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 通过promise的then()串连起来所有的请求拦截器/请求方法/ 响应拦截器
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  // 返回用来指定我们的onResolved和onRejected的promise
  return promise;
}; 

```



### 5.axios的请求/响应拦截器是什么？

> 函数





