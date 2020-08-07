## Node.js模块化理解

Node.js采用的是Commonjs规范，在NodeJs中，一般将代码合理拆分到不同的js文件中，每一个文件就是一个模块，而文件路径就是模块名。

在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。

> Node.js中模块的分类

- 核心模块（已经封装好的内置模块）；
- 自己定义的模块；
- 第三方的模块（npm下载下来的）



###				1.require

`require`函数用来在一个模块中引入另一个模块：用法：`let cc = require('模块名')`。模块名可用相对路径或绝对路径

require()函数的两个作用

- 执行导入的模块中的代码；
- 返回导入模块中的接口对象；



###				2.exports

`exports`对象用来导出当前模块的公共方法或属性，别的模块通过`require`函数使用当前模块得到的就是当前模块的`exports`对象。用法：`exports.name`,name为导出对象的名字。

> 其实exports类似于ES6中的export的用法，用来导出一个指定名字的对象



###				3.module.exports

`module.exports`用来导出一个默认对象，没有指定对象名，常见于修改模块的原始导出对象。比如原本模块导出的是一个对象，我们可以通过module.exports修改为导出一个函数。

> 注意使用exports时，只能单个设置属性exports.a = 
>
> 使用module.exports可以单个设置属性，也可以整个赋值



### 		4.模块初始化

一个模块中的JS代码仅在模块**第一次被使用时**执行一次，并且在使用的过程中进行初始化，之后缓存起来便于后续继续使用。



### 		5.主模块

通过命令形参传递传递个NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其他模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。

```js
$ node main.js // 运行main.js启动程序，main.js称为主模块
```



### 		总结

```js
1.Node中每个模块都有一个module对象。module对象中有一个exports属性为接	口的对象，我们需要把模块之间公共的方法或属性挂载在这个接口对象中，方	便	其他的模块使用这些公共的方法或属性。

2.Node中每个模块的最后，都会`retrun: module.exports`。

3.Node中每个模块都会把`module.exports`指向的对象赋值给变量exports,也就是	说：exports = module.exports。

4.如果需要导出多个成员时必须使用`exports.add = XXX; exports.foo = XXX`; 或者使用`module.exports.add = XXX;module.exports.foo = XXX`。
```





## Node中require加载第三方包的规则...

Node.js中使用CommonJs模块化机制，通过npm下载的第三方包，我们在项目中引入第三方包都是：`let xx = require('第三方包名')` ，而`require`方法加载第三方包的原理机制是什么？

```js
1. `require('第三方包名')`优先在加载该包的模块的同级目录`node_modules`中查找第三方包。

2. 找到该第三方包中的package.json文件，并且找到里面的main属性对应的入口模块，该入口模块即为加载的第三方模块。

3. 如果在要加载的第三方包中没有找到package.json文件或者是package.json文件中没有main属性则默认加载第三方包中的index.js文件

4. 如果在加载第三方模块的文件的同级目录没有找到`node_module`文件夹，或者以上所有情况都没找到，则会向上一级父级目录下查找`node_module`文件夹，查找规则如上一致。

5. 如果一直找到该模块的磁盘根路径都没有找到，则会报错：`can not find module xxx`。
```



## npm常见命令

npm英文全称：`node package manager`，常见的npm命令总结如下：

```js
`npm -v`: 查看npm版本。

`npm init`: 初始化后会出现一个`package.json`配置文件。可以在后面加上`-y`,快速跳过问答式界面。

`npm install`: 会根据项目中的`package.json`文件自动下载项目所需要的全部依赖。

`npm install 包名 --save-dev(npm install 包名 -D)`: 安装的包只用于开发环境，不用于生产环境，会出现在`package.json`文件中的`devDependencies`属性中。

`npm install 包名 --save(npm install 包名 -S)`: 安装的包需要发布到生产环境，会出现在`package.json`文件中的`dependencies`属性中。

`npm list`: 查看当前目录下已安装的node包。

`npm list -g`: 查看全局已经安装过的node包。

`npm --help`: 查看npm帮助命令。

`npm update 包名`: 更新指定包。

`npm uninstall 包名`: 卸载指定包。

`npm config list`: 查看配置信息。

`npm 指定命令 --help`: 查看指定命令的帮助。

`npm info 指定包名`: 查看远程npm上指定包的所有版本信息。

`npm install -g cnpm --registry=https://registry.npm.taobao.org`: 修改包下载源，此例修改为了淘宝镜像。

`npm root`: 查看当前包的安装路径。

`npm root -g`: 查看全局的包的安装路径。

`npm ls 包名`: 查看本地安装的指定包及版本信息，没有显示empty。

`npm ls 包名 -g`: 查看全局安装的指定包及版本信息，没有显示empty。
```



