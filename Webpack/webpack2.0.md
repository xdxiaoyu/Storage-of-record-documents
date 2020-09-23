手把手带你学会webpack4

收获：

彻底学会Webpack的配置

理解Webpack的作用及原理

上手项目的打包过程配置

拥有工程化的前端思维

步入高级前端工程师行列



## webpack安装步骤

初始化项目 `npm init`

### 一、全局安装(global)

```js
npm install webpack webpack-cli -g

// 非常不推荐全局安装webpack
// 假设我有两个项目，都用webpack打包，如果我全局安装webpack，webpack版本号是固定的就是现在的4.44.2。但假设我的一个项目是通过webpack3进行配置的，另一个项目才是通过webpack4进行配置的。如果全局安装的版本是4.44.2，那就意味着webpack3这个项目肯定是运行不起来的。
// 要解决这个问题，卸载webpack4，在再装webpack。当然全局安装以后没有办法同时启用两个项目。
```



### 二、局部安装(local)

```js
// 在当前文件目录下
npm install webpack webpack-cli -D

webpack -v
// 此时  讲无法输出版本号

npx webpack -v
// npx 会从当前目录的node_modules文件夹里寻找webpack
```



## webpack配置文件

webpack.config.js

```js
const path = require('path')

// node核心模块path两个小知识点复习
// __dirname：或取当前执行文件所在目录的完整目录名
// path.resolve()：把路径或者路径片段的序列解析为一个绝对路径
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}



// webpack指定配置文件进行打包 例：此时配置文件为-- webpackconfig.js
npx webpack --config webpackconfig.js

// 安装webpack-cli的作用
使得我们可以在命令行里运行webpack或者npx这样的指令
```



























