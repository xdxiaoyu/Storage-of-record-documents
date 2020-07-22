# Vuex源码阅读解析

Vuex是一个集中化的状态管理工具，废话不多说，上代码进行阅读。

## 1、目录结构

src:

​	module :	->

​	plugins:	->

​	helpers.js:	-> 提供如mapActions、mapMutations这样的API。

​	index.js:	-> 源码入口文件，暴露Store等各种API。

​	mixin:	-> 提供install方法

​	store:	-> Vuex核心代码

​	util:	-> 提供一些工具函数



## 2、源码解析



​	

