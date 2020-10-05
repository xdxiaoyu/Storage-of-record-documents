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



**webpack小考核 0_0**

```js
webpack是什么：webpack的核心概念是一个模块打包工具，他的主要作用是将各类文件打包在一起。打包后的文件作用于浏览器中。

模块是什么：在模块化编程中，开发者将程序分解成离散的功能块。

webpack的配置文件作用是什么 ：webpack打包会走默认配置，写了配置文件可以让打包按自己写的相关配置进行打包处理。

```



## loader

webpack不能识别非js结尾的后缀的模块，需要让webpack识别出来其他后缀模块

其实loader就是一个打包的方案。

ex:

```js
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.jpg$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```



### 静态资源打包:

### `file-loader`

[官方文档](https://www.webpackjs.com/loaders/file-loader/)

```js
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    // placeholder 占位符
                    name: '[name]_[hash].[ext]',
                    outputhPath: 'images/'
                }
            }
        }]
    }
}
```





### `url-loader`

官方文档

```js
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputhPath: 'images/',
                    limit: 20480, // 小于限制字节大小时打包成base64格式，大于则输出到指定文件夹通过http请求获取
                }
            }
        }]
    }
}
```





## Plugins

> plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情。（类似于Vue，react里面的生命周期函数）

### `HtmlWebpackPlugin`

> HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个HTML文件中

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
      template: ''
  })]
};

module.exports = webpackConfig;
```



### `CleanWebpackPlugin`

>此插件将output.path在每次成功重建后删除webpack目录中的所有文件以及所有为使用的webpack资产。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
     new CleanWebpackPlugin({
         protectWebpackAssets: false, // 允许删除当前打包文件的资源（默认是true-不允许）
  	 })
  ]
};

module.exports = webpackConfig;
```



##  entry和output

多文件打包配置

```js
const path = require('path')

module.exports = {
    mode: 'development',
    emntry: {
        main: './src/index.js',
        sub: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: [name]_[hash].[ext],
            	    outputPath: 'images/',
            		limit: 20480
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin({
            protectWebpackAssets: false,
        })
    ],
    output: {
        publicPath: 'http://cdn.com.cn',  // 按需加载外部资源
        // 打包后的文件 <script src="http://cdn.com.cn/main.js">
        filename: '[name].js',
        path: path.reslove(__dirname,'dist')
    }
}

// 打包后文件：
// <script src="http://cdn.com.cn/main.js"></script>
// <script src="http://cdn.com.cn/sub.js"></script></body>
```



## sourceMap

> sourceMap 它是一个映射关系， 映射打包后文件出错的地方对应实际项目文件错误的位置

```js
module.export = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    ...
}
```



## WebpackDevServer





