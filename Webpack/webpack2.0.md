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

> 提高开发效率，不需要每次更改代码都重新输入命令启动服务

```js
module.export = {
    entry: {
        main: './src/index.js',
    },
    devServer: {
        contebtBase: './dist', // 告诉服务器从哪里提供内容。只有你想要提供静态文件时才需要。
        open: true, // 自动打开浏览器访问地址
    }
}
```



借助node和webpack中间件实现WebpackDevServer

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const complier = webpack(config)

const app = express()
// webpackDevMiddleware 中间件，可以监听webpack打包代码发生的变化

app.use(webpackDevMiddleware(complier))

app.listen(3000, () => {
    console.log('server is running')
})
```



## HotModuleReplacementPlugin

> 插件实现热更新

```js
const webpack = require('webpack')

module.exports = {
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnle: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

在入口文件中配置文件更改后需要更新的操作

```js
if(module.hot) {
	module.hot.accept('./number.js', () => {
        document.getElemntById('number')
        document.body.removeChild(document.getElmentById('number'))
        number()
    })   
}
```



## babel

> babel将ES6语法转ES5

```js
module: {
    rules: [{
        // exclude 排出在外的模块
    	{
      		test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
             options: {
        	   "presets": [["@babel/preset-env", { useBuiltIns: 'usage'}]]
 			}
        }
    }]
}
```



低版本的浏览器没有ES6的新语法，还需要补充

```js
npm install --save @babel/polyfill


// 在打包主文件的头部引入
import "@babel/polyfill";
```

[polyfill](https://www.babeljs.cn/docs/babel-polyfill)

```js
{
    test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",options: {
        // 业务代码使用
        "preset": [["@babel/preset-env", {
            targets: {
                chrome: '67', // 打包会运行在67版本上的浏览器
            }，
            useBuiltIns: 'usage'
        }]]
    }
}
// 这是通过全局注入方式变量，会造成全局污染
```



编写UI组件库，可以通过另一种发生打包ES6文件避免造成全局污染

> @babel/plugin-transform-runtime

```js
"plugins": [[
   // 不会污染全局，已闭包的形式注入，适合编写UI组件库或者库的时候使用
       "@babel/plugin-transform-runtime",
        {
          "absoluteRuntime": false,
          "corejs": 2, // 不配置不会把es6语法打包进去
          "helpers": true,
          "regenerator": true,
          "useESModules": false,
          "version": "7.0.0-beta.0"
        }
 ]]
```



还可以通过`.babelrc`文件将`options`里面的配置项写入进去，避免`options`对象特别长冗余



## Tree Shaking

> 你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。
>
> 删除模块中“未引用代码”，只支持ES Module的引入，这是因为`import`这种ES的模块引入底层是一个静态引入的方式，而Commdjs底层是动态引入。而Tree Shaking只支持静态方式的引入

```js
module.exports = {
    optimization: {
     usedExports: true
    },
}

// webpack.config.js文件
```



```js
{
    "sideEffects": false,
}
    
// package.json文件
```



会遇见的问题：

```js
import '@babel/polyfill' 
// 当腻引入babel/polyfill时，实际上并未导出任何内容，他是直接在window对象上绑定Promise等等..
// 当Tree Shaking 进行打包的时候发现没有任何导出内容很可能就会直接忽略掉，但实际上是需要的。使用Tree Shaking就会忽略会导致报错
// 解决方案： 在package.json文件中写入-
"sideEffects": ["@babel/polyfill"]
// 如果没有特殊处理直接写false

import './style.css'
// 当引入css文件时，同理
// 解决方案：在package.json文件中写入
"sideEffects": ["*.css"]

```



## Develoment和Production模式的区分打包

> 差异：
>
> develoment环境中，sorcemap是非常全的，可以快速定位问题。不压缩
>
> production环境中，被压缩，sorcemap比较简单的映射关系









