# Webpack

## 入口(entry)

> 入口起点(entry point)告诉webpack那个是原始文件。找到这个原始文件之后开始寻找依赖包和各种资源，根据这些包还有资源选择合适的loader进行处理。这个入口是需要在webpack的配置文件（webpack.config.js）中来声明的：

```js
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```



## 出口(output)

> 出口（output）是告诉webpack经过各种loader处理后的文件应该生成到哪个目录下，也就是生成文件所在的地方。同样需要显示的告诉webpack的配置文件（webpack.config.js）

```javascript
const path = require('path')

module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
}
```



## loader

> 构建的过程除了处理原生的JavaScript，还需要处理其他非JavaScript文件，比如图片、CSS、ES6等等。webpack loader的作用就是提供一个机制能保证所有的类型资源都可以采用对应的loader进行处理，这样webpack就能完成更加复杂的构建过程。而这个loader也是需要在配置文件（webpack.config.js）中来定义的：

```js
const path = require('path')

const config = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            {test: /\.txt$/, user: 'raw-loader'}
        ]
    }
};
module.exports = config;
```



## 插件(plugins)

> loader被用于转换某些资源类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括打包、优化和压缩、重新定义环境中的变量。插件接口的功能极其强大，可以用来处理各种各样的任务

想要使用一个插件，你只需要require()它，然后把它添加到plugins数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的的而多次使用同一个插件，这时需要通过使用new操作符来创建它的一个实例。

```js
const HtmlWebpackPlugin = require('html-webpack-pugin') // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
    module: {
        rules: [
            {tets: /\.txt$/, user: 'raw-loader'}
        ]
    },
    plugins: {
        new HtmlWebpackPlugin({template: './src/index.html'})
    }
};
module.exports = config
```



## 模式

> 平时我们会存在两种状态：开发模式、生产模式。构建的过程中也是需要的，比如我们在开发环境需要快读的构建，在生产环境需要构建一个最符合线上环境的版本。这样我们只要在配置文件中简单的配置一下就可以达到目的：

```js
module.export = {
    mode: 'production'
}
```



## Babel

> Bable 是一个工具链，主要用于将ECMAScript 2015+ 版本的代码转换为向后兼容的JavaScript语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

