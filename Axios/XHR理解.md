# XHR的理解和使用

## 1.理解

① 使用XMLHttpRequest(XHR)对象可以于服务器交互，也就是发生ajax请求。

② 前端可以获取到数据，而无需让整个的页面刷新。

③ 这使得Web页面可以只更新页面的局部，而不影响用户的操作。



## 2.区别一般http请求与ajax请求

① ajax请求是一种特别的http请求

② 对服务端来说，没有任何区别，区别在浏览器端

③ 浏览器发送请求： 只有XHR或fetch发出的才是ajax请求，其它所有的都是非ajax请求。

④ 浏览器端接收到响应

​	（1）一般请求：浏览器一般会直接显示响应体数据，也就是我们常说的刷新跳转页面

​	（2）ajax请求： 浏览器不会对外界进行任何更新操作，只是调用监视的回调函数并传入响应相关数据



## 3.XHR相关API

1.XMLHttpRequest(): 创建XHR对象的构造函数

2.status： 响应状态码值，比如200,404

3.statusText: 响应状态文本

4.readyState: 标识请求状态的只读属性

​	0： 初始

​	1：open()之后

​	2：send()之后

​	3：请求中

​	4：请求完成

5.onreadystatechagnge: 绑定readyState改变的监听

6.responseType： 指定响应数据类型，如果是‘json’，得到响应后自动解析响应体

7.response：响应体数据，类型取决于responseType的指定

8.timeout: 指定请求超时时间，默认为0代表没有限制

9.ontimeout： 绑定超时的监听

10.onerror: 绑定请求网络错误的监听

11.open()" 初始化一个请求，参数为：（method，url[，async]）

12.send(data): 发送请求

13.abort():请求中断

14.getResponseHeader(name): 获取指定名称的响应头值

15.getAllResponseHeader(name): 获取所有响应头组成的字符串

16.setRequestHeader(name, value): 设置请求头 















