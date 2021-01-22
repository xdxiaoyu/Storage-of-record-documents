js手把手带你学会webpack4

收获：

彻底学会Webpack的配置

理解Webpack的作用及原理

上手项目的打包过程配置

拥有工程化的前端思维

步入高级前端工程师行列



## 1、初识Webpack
### webpack安装步骤

初始化项目 `npm init`

#### 一、全局安装(global)

```js
npm install webpack webpack-cli -g

// 非常不推荐全局安装webpack
// 假设我有两个项目，都用webpack打包，如果我全局安装webpack，webpack版本号是固定的就是现在的4.44.2。但假设我的一个项目是通过webpack3进行配置的，另一个项目才是通过webpack4进行配置的。如果全局安装的版本是4.44.2，那就意味着webpack3这个项目肯定是运行不起来的。
// 要解决这个问题，卸载webpack4，在再装webpack。当然全局安装以后没有办法同时启用两个项目。
```



#### 二、局部安装(local)

```js
// 在当前文件目录下
npm install webpack webpack-cli -D

webpack -v
// 此时  讲无法输出版本号

npx webpack -v
// npx 会从当前目录的node_modules文件夹里寻找webpack
```



### webpack配置文件

webpack.config.js

```js
const path = require('path')

// node核心模块path两个小知识点复习
// __dirname：获取当前执行文件所在目录的完整目录名
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



## 2、Webpack核心概念
### loader

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





### Plugins

> plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情。（类似于Vue，react里面的生命周期函数）

#### `HtmlWebpackPlugin`

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



#### `CleanWebpackPlugin`

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



###  entry和output

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



### sourceMap

> sourceMap 它是一个映射关系， 映射打包后文件出错的地方对应实际项目文件错误的位置

```js
module.export = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    ...
}
```



### WebpackDevServer

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



### HotModuleReplacementPlugin

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



### babel

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


## 3、Webpack进阶
### Tree Shaking

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
// 当你引入babel/polyfill时，实际上并未导出任何内容，他是直接在window对象上绑定Promise等等..
// 当Tree Shaking 进行打包的时候发现没有任何导出内容很可能就会直接忽略掉，但实际上是需要的。使用Tree Shaking就会忽略会导致报错
// 解决方案： 在package.json文件中写入-
"sideEffects": ["@babel/polyfill"]
// 如果没有特殊处理直接写false

import './style.css'
// 当引入css文件时，同理
// 解决方案：在package.json文件中写入
"sideEffects": ["*.css"]

```



### Develoment和Production模式的区分打包

> 差异：
>
> develoment环境中，sorcemap是非常全的，可以快速定位问题。不压缩
>
> production环境中，被压缩，sorcemap比较简单的映射关系



#### webpack-merge

```js
公用的内容可以引入至 webpack.common.js中
```

> webpack.dev.js

```js
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // production环境下使用cheap-module-source-map
  devServer: {
    contentBase: './dist',
    open: true, // 自动打开浏览器访问地址
    hot: true,
    // hotOnly: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // production 环境打包时，下方代码可以注释
  optimization: {
    usedExports: true
  },
}
module.exports = merge(commonConfig, devConfig)

```



> webpack.prod.js

```js
const { merge } = require('webpack-merge')
const commonCofig = require('./webpack.common.js')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // production环境下使用cheap-module-source-map

  // 线上打包可以去掉
  // devServer: {
  //   contentBase: './dist',
  //   open: true, // 自动打开浏览器访问地址
  //   hot: true,
  //   hotOnly: true
  // },

  // production 环境打包时，下方代码可以注释
  // optimization: {
  //   usedExports: true
  // },

}
module.exports = merge(commonCofig, prodConfig)
```



> webpack.common.js

```js
// node核心模块path两个小知识点复习
// __dirname：或取当前执行文件所在目录的完整目录名
// path.resolve()：把路径或者路径片段的序列解析为一个绝对路径
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        // loader: 'file-loader',
        // options: {
        //   // placeholder 占位符
        //   name: '[name]_[hash].[ext]',
        //   outputPath: 'images/'
        // }
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 20480
        }
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    },
    // exclude 排出在外的模块
    {
      test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
      // options: 将放入.babelrc中 
      // {
      //   // 业务代码使用
      //   // "presets": [["@babel/preset-env", {
      //   //   targets: {
      //   //     chrome: '67', // 打包会运行在67版本的上的浏览器
      //   //     safari: '11.1', // 同理
      //   //   },
      //   //   useBuiltIns: 'usage'
      //   // }]]
      //   "plugins": [[
      //     // 不会污染全局，已闭包的形式注入，适合编写UI组件库或者库的时候使用
      //     "@babel/plugin-transform-runtime",
      //     {
      //       "absoluteRuntime": false,
      //       "corejs": 2, // 不配置不会把es6语法打包进去
      //       "helpers": true,
      //       "regenerator": true,
      //       "useESModules": false,
      //       "version": "7.0.0-beta.0"
      //     }
      //   ]]
      // }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    // publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```





###  Code Splitting(代码分割)

> webpack和Code Splitting的关系
>
> 无关

```js
// webpack中实现代码分割，两种方式

// 1.同步代码：只需要再webpack.common.js中做optimization的配置
// 2.异步代码：无需任何设置，会自动进行代码分割，放置到新的文件中

module.exports = {
    entry: {
        main: './src/index.js',
    },
    module: {
        rules: [{...}]
    },
    plugins: [
         optimization: { splitChunks: { chunks: 'all' } } 
    ]
}
```



#### SplitChunks

> SplitChunksPlugin参数配置

```js
module.exports = {
    entry: {
        main: './src/index.js',
    },
    module: {
        rules: [{...}]
    },
    plugins: [
         optimization: { 
           splitChunks: { 
                chunks: 'all', // 针对同步和异步代码都做分割。initial-同步代码 async-异步代码
                minSize: 30000, // 引入库大于当前数值30000kb，才做代码分割
                minChunks: 1, // 打包生成的chunk文件，有几个引用了这个模块，小于当前数值将不进行分割（当一个模块被用了至少多少次的时候才进行代码分割）
                maxAsyncRequests: 30, // 按需加载时的最大并行请求数，超过将不进分割
                maxInitialRequest; 30, // 入口点的最大并行数
                automaticNameDelimiter: '~', // 生成文件名连接符
                enforceSizeThreshold: 50000, // 强制执行拆分的大小阈值和其他限制
                cacheGroups: { // 缓存组。同时引入两个第三方模块，使用cacheGroups可以让两个模块打包在一个js文件中
                	vendors: {
                	   test: /[\\/]node_modules[\\/]/,
                	   priority: -10, // default和vendors都满足时，哪个priority值大就会被打包到哪个组里
                	   filename: 'vendors.js' // 允许覆盖文件名
                	},
    			   default: {
                       priority: -20,
                       reuseExistingChunk: true, // 已打包过的 模块再次在其他模块中被使用时，将不会重复打包
                       filename: 'common.js'
                   }
                }
           }
 		} 
    ]
}
```



### Lazy Loading

> Lazy Loading（懒加载）其实并不是webpack里面的模块，是ECMAScript里面的，本质关系不大。webpack只是能识别import这种语法进行代码分割

```js
// Lazy Loading
function getComponent() {
    return import(/*webpackChunkName:"lodash"*/'lodash').then(({ default: _}) => {
        var element = document.createElemnet('div')
        element.innerHTML = _.join(['DEll', 'Lee'], '-')
        return element
    })
}
document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element)
    })
})


// 同async-await优化

async function getComponent() {
    const { default: _ } = await import(/*webpackChunkName:"lodash"*/'lodash')
    const element = document.creteElement('div')
    element.innerHTML = _.join(['Dell', 'Lee'], '-')
    return element
}
document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element)
    })
})
```




### Chunk是什么

```js
// Chunk
// 每一个打包出来的js文件都是chunk
```





### 打包分析

> 当我们使用webpack进行代码的打包之后，我们可以借助打包分析的一些工具。来对打包后的文件进行一定的分析，然后来看一下它打包是否合理
>
> 打包分析工具github地址: https://github.com/webpack-contrib/webpack-bundle-analyzer										
>
> 配置代码为： `webpack --profile --json > stats.json`

```js
// 在package.json文件中加入
// 未加入打包生成json文件分析代码
"script": {
    "dev-build": "webpack --config ./build/webpack.dev.js"
}
// 加入以后
"script": {
    "dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js"
}
// 打包会生成 stats.json文件，可在上述github网站提供的-analyse下面地址，进行打包工具分析
```



除了上述地址可以分析打包后的文件，webpack官网还提供了其他社区支持：https://webpack.js.org/guides/code-splitting/#bundle-analysis



### Preloading

```js
document.addEventListener('click', () => {
  import(/* webpackPreloading: true */ './click.js').then(({default: func}) => {
    func()
  })
})

// 会和主的业务文件一起去加载。所以用下面是webpack使用更优的一种方式
```



### Prefetching

```js
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
    func()
  })
})

// 会等待核心代码加载完成之后，页面宽空闲的时候，再去加载‘webpackPrefetch’对应的js文件。
// 浏览器可能会存在兼容性问题
```




### Shimming

> `webpack` 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 *shimming* 发挥作用的地方。

jquery.ui.js

```js
export function ui() {
  $('body').css('background', _join(['green'], ''));
}
// 报错 Uncaught ReferenceError: $ is not defined
// 因为一个模块和另一个模块变量是隔离的
// 需要直接引入  import $ from 'jquery'
// 如果使用第三方的库，不可能去修改源码，此时就需要使用webpack解决这个问题
```

index.js

```js
import $ from 'jquery';
import { ui } from './jquery.ui'
ui()

const dom = $('<div>');
dom.html('----'));
$('body').append(dom)
```



webpack.config.js

```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // production环境下使用cheap-module-source-map
  devServer: {
    contentBase: './dist',
    open: true, // 自动打开浏览器访问地址
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240
        }
      }
    },
    // exclude 排出在外的模块
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
        },
      ],
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()  注释打包分析 
    // 此处添加 ProvidePlugin 方法可解决上述 `jquery.ui.js` 文件的报错
    new webpack.ProvidePlugin({
      $: 'jquery', // 当发现你的一个模块里用了$这个字符串，就会在这个模块中导入jquery这个库
      _join: ['lodash', 'join']
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```


## 4、Webpack实战配置案例讲解
### library

> 第三方库如何配置被引用

webpack.config.js

```js
const path = require('path')

module.export = {
    mode: 'production',
    externals: 'lodash', // lodash在打包库的时候，不打包到库的代码里去，而是让业务代码加载。
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        
        // 不管你通过任何形式引入这个库，都能让你引入到
        libraryTarget: 'umd',
        // ex: import libary from 'library'
        //     const library = require('library')
        //     require(['library'], function() {})
        
        // 想用 <script src='library.js'></script>这种方式引入，全局使用library.math等等
        library: 'library', // 可命名为其他字符串
        // 打包生成的代码挂载到一个页面的全局变量'library',配置了一个'library'参数
        
        // libraryTarget: 'this' // 'window'
        // 将'library'挂载到this对象或者window上，此时不支持'umd'的引入模块方式
    }
}
```



### plugin-钩子函数

Plugin-插件什么时候有效？我们打包的某些时刻里面你想做一些事情，这个时候是插件生效的时刻。

copyright-webpack-plugin.js

```js
Class CopyrightWebpackPlugin {
    // constructor(options) {
       // console.log('插件被使用了',options);
	//}
}

apply(compiler) {
    // compiler - 存放打包所有相关的内容
    // 钩子。 emit: 生成资源到 output 目录之前。
    // tapAsync:  接收两个参数， 这个plugin的名字和回调函数
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
        debugger
        // compilation - 存放这次打包的相关内容
        compilation.assets['copyright.txt'] = {
            source: function() {
                return 'copyright by dell lee'
            },
            size: function() {
                return 21
            }
        }
        cb()
    })
    
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
        console.log('compiler')
    })
}

module.exports = CopyrightWebpackPlugin
```



webpack.config.js

```js
const path = require('path')
const CopyrightWebpackPlugin = require('./plugin/copyright-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    plugin: [
        new CopyrightWebpackPlugin({
            name: 'dell' // 传参调试使用（并不是官方配置参数）
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```



package.json

```json
{
  "name": "plugin",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
      // 两个命令干的事情是一样的，第一种可以传入node的参数进去
    "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js",
     // --inspect: 我要开启node的调试工具
     // --inspect-brk: 我在运行webpack.js做调试的时候，在webpack执行的时候在第一行打上一个断点
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.11.0",
    "webpack-cli": "^4.2.0"
  }
}
```





### TypeScript的打包配置

`index.ts`

```tsx
import * as _ from 'lodash'

// 对于第三方库，在ts文件中引用。如果想要库在调用方法时给予调用的错误警告，需要安装这个库的类型文件
// 例如上述： npm install @type/lodash --save-dev

Class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return _.join(['hello,', '', this.greeting], '')
    }
}

let greeter = new Greeter('world')

alert('greeter.greet()')
```

`webpack.config.js`

```js
cosnt path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader', // 这个loader打包时需要一个tsconfig.json文件。里面配置了对ts打包的配置项。
            exclude: /node_modules/
        }]
    },
    output: {
        filname: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

`tsconfig.json`

```json
{
    "compilerOptiuons": {
        "outDir": "./dist",
        "module": "es6", // 我们使用的是esmodule引入模块的方式即(import)
        "target": "es5", // 打包生成文件的语法类型
        "allowJs": "true", // 允许在ts文件中引用js的模块
    }
}
```



### 使用webpackDevServer实现请求转发

index.js

```js
import "@babel/polyfill";

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

class App extends Component {
    componentDidMount() {
        axios.get('/react/api/header.json')
            .then((res) => {
            console.log('结果: ', res);
        })
    }
    render() {
        return <div>Hello World</div>
    }
}

ReactDom.render(<App/>, document.getElementById)
```



webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true,
        proxy: {
            '/react/api': {
                target: 'http://www.dell-lee.com',
                pathRewrite: {
                    'header.json': 'demo.json'
                },
                secure: false, // 请求如果转发到https上，需要配置这个参数为false
                bypass: function(req, res, proxyOptions) {
                    // 如果你请求html路径的接口，直接跳过转发，返回对应路径下的index.html或false(该返回啥返回啥，不走代理)
                  if (req.headers.accept.indexOf('html') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return '/index.html'; // return false
                  }
                },
                changeOrigin: true, // 可以突破网站对orgin的限制
                header: {
                  host: 'www.dell-lee.com',
          		  cookie: 'sdfasa'
                }
            } 
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWeboackPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
```



### Bundler 源码编写(Dependencies Graph)

--------



### Eslint 在webpack中的配置 

> 安装 
> ```bash
> npm install eslint-webpack-plugin --save-dev
> npm install eslint --save-dev
> ```



用法

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};
```



### 提升Webpack打包速度的方法

 

```js
1、跟上技术的迭代（Node，Npm，Yarn）
2、在尽可能少的模块上应用Loader
3、Plugin尽可能精简并确保可靠
5、使用DllPlugin提高打包速度
6、控制包文件大小
7、多进程打包 -- thread-loader,parallel-webpack,happyack
8、合理使用sourceMap
9、结合stats分析打包结果
10、开发环境内存编译（无用插件剔除）
```



### 多页面打包配置



## 5、Webpack 底层原理及脚手架工具分析

### 1、如何编写一个Loader

index.js

```js
consoel.log('heloo dell')
```



loaders/replaceLoader.js

```js
const loaderUtils = require('loader-utils')

module.export = function(source) {
    const option = loaderUtils.getOption(this)
    console.log(options)
    // return source.replace('dell', option.name)
    const result = source.replace('dell', options.name)
    this.callback(null, result)
}

// 可以同步或异步调用以返回多个结果的函数
this.callback(
    err: Error || null,
    content: string | Buffer, // 源代码进来，解析过后新的代码
    sourceMap?: SourceMap, // 打包sourceMap信息
    meta?: any // 额外想往外传递的信息
)
```



webpack.config.js

```js
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.js/,
            // use: [path.resolve(__dirname, './loaders/replaceLoader.js')]
            use: [
                {
                    loader: path.resolve(__dirname, './loaders/replaceLoader.js')
                    options: {
                    	name: 'xiaoYu'
                	}
                }
            ]
        }]
    },
    output: {
        path: path.resolve(__dirname, dist),
        filename: '[name].js'
    }
}
```



### 2、如何编写一个Plugin

> 是webpack源码中80%都是基于Plugin机制编写的,可以说Plugin它的灵魂。（实例见4-plugin-钩子函数）



### 3、Bundler源码编写（模块分析）























## 6、Create-React-App 和 Vue-Cli 3.0脚手架工具配置分析

