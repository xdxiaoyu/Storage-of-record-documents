手把手带你学会webpack4

收获：

彻底学会Webpack的配置

理解Webpack的作用及原理

上手项目的打包过程配置

拥有工程化的前端思维

步入高级前端工程师行列



## webpack安装步骤

初始化项目 `npm init`

### 一、全局安装

```js
npm install webpack webpack-cli -g

// 非常不推荐全局安装webpack
// 假设我有两个项目，都用webpack打包，如果我全局安装webpack，webpack版本号是固定的就是现在的4.44.2。但假设我的一个项目是通过webpack3进行配置的，另一个项目才是通过webpack4进行配置的。如果全局安装的版本是4.44.2，那就意味着webpack3这个项目肯定是运行不起来的。
// 要解决这个问题，卸载webpack4，在再装webpack。当然全局安装以后没有办法同时启用两个项目。
```



### 二、项目里安装

