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



### 工作原理

Code(代码)-parse(解析转换)-AST(抽象语法树) -transform(转换)-AST-plugins-AST-generator(还原)-Code

![image-20200628164355873](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200628164355873.png)



> Babel首先是把原始的代码转成抽象语法树(AST)，然后基于这个AST做转换，每个转换被处理成插件的形式，最后把AST还原成代码。实际我们应用起来只需要三步：根据应用场景选择引用场景、安装工具、配置文件。



npm install -D babel-loader @babel/core @babel/preset-env

> babel-loader是webpack是一会要用的，要用babel-loader就一定要用到babel，要用到babel就需要安装babel/core。
>
> babel在做转换的时候，需要怎么处理呢？需要有一个规则和集合，babel/preset-env就是这个规则和集合





# ESlint

> ESlint最初是由Nicholas C.Zakas于2013年6月创建的开源项目。它的目标是提供一个插件化的、可组装的JavaScript和JSX工具。 

## 规则

ESLint每个规则会设置三个检查等级：

"off" 或 0 - 关闭规则

"warn" 或 1 - 开启规则，使用警告级别的错误：warn(不会导致程序退出)

"error" 或 2 - 开启规则，使用错误级别的错误：error(当被触发的时候，程序会退出)



## 插件

ESLint通过插件的机制来拓展规则的建设、也就是说插件是用来自定义规则的，我们可以使用他人的插件也可以自己开发插件。

插件的命名方式是：eslint-plugin- plugin-name，比较流行的ESLint插件有 eslint-pluigin-standard、eslint-plugin-vue



## 配置

ESlint被设计为完全可配置的，这意味着你可以关闭每一个规则而只运行基本语法验或混合匹配。有两种主要方式来配置SELint：

1、**Configuration Comments** - 使用 JavaScript注释把配置信息直接嵌入到一个代码源文件中。

2、**Configuration Files**- 使用JavaScript、JSON、或者YAML文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的.eslintrc.*文件，或者直接在package.json文件里的eslintConfig字段指定配置，ESLint会查找和自动读取它们。

