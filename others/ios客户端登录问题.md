## 问题：

​	客户端登录成功采用history.back()/history.go(-1)这种方式进行回跳。安卓手机上回跳数据显示一切正常，但在IOS手机上回跳后页面数据显示或登录状态没有任何改变（和未登录前一样）。



## 原因分析：	

​	在Vconsole的情况，观察到IOS返回页面没有调试打印的log,也没有请求记录，而android都有。进一步分析可能是设备内部机制的问题---上网搜索发现IOS设备为了提升浏览器网页的效率，可能会给已经浏览过的网页增加一个类似快照的东西。当点击返回按钮时，直接调用给用户看，省去了执行js这一步骤，所以没有请求接口拿到登录后的新数据。



## 解决方案：

### 	第一版解决方案：

> 如果页面是缓存且是回退访问的，就将整个页面进行window.location.reload()刷新，这样接口重新请求了，登录后的数据也能拿到。但是这种行为用户体验感极差，回退到页面还会再有一个刷新的过程。

### 	第二版解决方案：

> 不对整个页面进行刷新，只调用相关的接口进行数据的渲染更新。

```javascript
window.addEventListener('pageshow', (event) => {
if(event.persisted || window.performance && window.performance.navigation.type == 2 	) { 
        if(uni.getStorageSync("systemType") == "ios") {
          resolve()
        } else {
          reject()
        }
      }
    });
```

首先我们监听onpageshow事件。

通过 PageTransitionEvent 对象的 persisted 属性来判断该页面是直接从服务器上载入还是从缓存中读取，再判断用户是不是通过回退访问本页面，是否是ios设备。如果都是，那用户访问的页面肯定展示的是快照，此时我们只需要调用相应接口进行数据的更新渲染，就能正常显示登录后的状态和数据。



## onpageshow事件

> onpageshow 事件在用户浏览网页时触发,它类似于 [onload](https://www.runoob.com/jsref/event-onload.html) 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，但 onload 事件在页面从浏览器缓存中读取时不触发。



## API：window.performance

> [`window.performance`](https://www.w3.org/TR/2014/WD-navigation-timing-2-20140325/) 是W3C性能小组引入的新的API，目前IE9以上的浏览器都支持
>
> navigation字段统计的是一些网页导航相关的数据：
>
> 1. redirectCount:重定向的数量（只读），但是这个接口有同源策略限制，即仅能检测同源的重定向；
> 2. type 返回值应该是0,1,2 中的一个。分别对应三个枚举值:
>    - 0 : TYPE_NAVIGATE (用户通过常规导航方式访问页面，比如点一个链接，或者一般的get方式)
>    - 1 : TYPE_RELOAD (用户通过刷新，包括JS调用刷新接口等方式访问页面)
>    - 2 : TYPE_BACK_FORWARD (用户通过后退按钮访问本页面)