# Axios基础配置了解

**Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中。**



## 请求配置

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

## 响应结构

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



















