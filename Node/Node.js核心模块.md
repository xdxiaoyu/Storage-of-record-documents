 ## fs模块

### 			1.读文件
**语法**：

```js
fs.readFile(path[, options], callback)
```

> 接收三个参数，写入文件路径，操作和编码格式等，回调函数


```js
var fs = require('fs') 

// 同步，等待和堵塞
var content = fs.readFileSync('hello.txt', { flag: 'r', encoding: "utf-8" })
console.log(content);

// 异步
fs.readFile('hello.txt', { flag: 'r', encoding: "utf-8" }, (err, data) => {
   if (err) {
     console.log(err);
   } else {
     console.log(data);
   }
 })

// 一般都用Promise对读取文件进行封装
function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: "utf-8" }, (err, data) => {
      if (err) {
        // 失败执行的内容
        reject(err)
      } else {
        // console.log(data);
        resolve(data)
      }
    })
  })
}
// 配合async顺序调用
async function ReadList() {
  var file2 = await fsRead('hello.txt')
  var file3 = await fsRead(file2+ '.txt')
  var file3Content = await fsRead(file3+ '.txt')
  console.log(file3Content);
}

ReadList()
```



### 			2.写文件

**语法**

```js
fs.writeFile(file, data[, options], callback)
```



> wirteFile接受三个参数，写入文件路径，写入内容，回调函数。
>
> 写入成功时候：error为null；写入失败时候：error为错误对象

```js
let fs = require('fs');
// flag
// write=>w   read=>r   apped=>a
// 'w': 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。
// 'a': 打开文件用于追加。 如果文件不存在，则创建该文件。

fs.writeFile('test.txt',"今晚吃啥？\n", {flag: 'a',encoding:"utf-8"},function(err){
  if(err) {
    console.log(err,'写入内容出错');
  }else {
    console.log('写入内容成功');
  }
})


// Promise封装写入文件
function writefs(path,content){
  return new Promise((resolve,reject) => {
    fs.writeFile(path,`${content}\n`, {flag: 'a',encoding:"utf-8"},function(err){
      if(err) {
        reject(err)
      }else {
        resolve(err)
      }
    })
  })
}
async function writeList() {
  await writefs('xy.html', '<h1>1今天学Node</h1>')
  await writefs('xy.html', '<h1>2明天学Node</h1>')
  await writefs('xy.html', '<h1>3后天学Node</h1>')
  await writefs('xy.html', '<h1>4大后天学Node</h1>')
}

writeList()
```



### 		3.删除文件

**语法**

```js
fs.unlink(path, callback)
```

> 删除文件回收站没有，基本不可恢复

```js
let fs = require('fs')
fs.unlink('xy.txt',function() {
  console.log('成功删除');
})
```



### 	4.读取目录

**语法**

```js
fs.readdir(path, callback)
```
> callback有两个参数，error：为错误信息；files：为目录下的文件数组列表

```js
let fs = require('fs')
let { fsWritefs, fsRead } = require('./lcfs')

const txtPath = "all.txt"
fs.readdir('../fs', function (err, files) {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
    files.forEach(async (filename, i) => {
      let content = await fsRead('../fs/' + filename)
      await fsWritefs(txtPath, content)
    })
  }
})
```





### 	5.创建目录

**语法**

```js
fs.mkdir(path[,option], callback)
```



### 6.删除目录

**语法**

```js
fs.rmdir(path. callback)
```

> 回收站无法找回

```js
let fs = require('fs')

fs.rmdir('abc',() => {
  console.log('删除成功');
})
```



### 7.输入输出

> 该`readline`模块提供了一个接口，用于一次从一行的[Readable](https://nodejs.org/api/stream.html#stream_readable_streams) 流（例如[`process.stdin`](https://nodejs.org/api/process.html#process_process_stdin)）中读取数据。
>
> 一旦调用了此代码，Node.js应用程序将`readline.Interface`在接口关闭之前终止， 因为接口等待`input`流上接收到数据。

```js
let readline = require('readline');
// 导入readline包

// 实例化接口对象
let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//设置r1,提问事件
r1.question("今天学什么？", (answer) => {
  console.log('答复：', answer);
  r1.close()
})
r1.on('close', () => {
  process.exit(0)
})
```



## Node.js Stream(流)

Stream是一个抽象接口，Node中有很多对象实现了这个接口。例如，对http服务器发起请求的request对象就是一个Stream，还有stdout(标准输出)。

Node.js，Stream有四种流类型：

- **Readable**	-	可读操作。
- **Writable**     -    可写操作。
- **Duplex**        -    可读可写操作。
- **Transform**   -   操作被写入数据，然后读出结果。



所有的Stream对象都是EventEmitter的实例。常用的事件有：

- **data**     - 当有数据可读时触发。
- **end**      - 没有更多的数据可读时触发。
- **error**    - 在接收和写入过程中发生错误时触发。
- **finish**   - 所有数据已被写入到底层系统时触发。





### 写入流

**语法**：

```js
fs.createWriteStream(文件路径，[可选的配置操作])
```

例子：

```js
let fs = require('fs')
// 创建写入流
let ws = fs.createWriteStream('hello.txt', { flags: 'w', encoding: 'utf-8' })
console.log(ws);
// 监听文件打开事件 
ws.on('open', () => {
  console.log("文件打开了");
})
// 监听准备事件
ws.on('ready', () => {
  console.log("文件写入已准备状态");
})
// 监听文件关闭事件
ws.on('close', () => {
  console.log('文件写入完成关闭');
})
// 文件流式写入
ws.write("helloworld!", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("内容流入完成");
  }
})
// 文件写入完成 
ws.end(() => {
  console.log("文件写入关闭");
})
```

​	

### 从流中读取数据

**语法：**

```js
fs.createReadStream(路径,[可选的配置项])
```

```js
// 语法：fs.createReadStream(路径,[可选的配置项])
let rs = fs.createReadStream('hello.txt', { flags: 'r', encoding: 'utf-8' })
console.log(rs);

rs.on('open',() => {
  console.log('读取的文件打开');
})

rs.on('close',() => {
  console.log('读取流结束');
})

// 每一次数据流入完成
rs.on('data',(chunk) => {
  console.log(chunk);
})
```



### 管道流

> 在`'pipe'`当事件被发射[`stream.pipe()`](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options)方法被称为上的可读流，添加该可写至其目的地集合。





## path模块+os模块

Node.js中`path`模块提供了一些路径操作的API，`os`模块提供了一些操作系统相关信息的API

#### 1.path

`path.extname('hello.md')`获取文件（可以是一个路径文件）的扩展名，演示如下:

```js
let path = require('path')
console.log(path.extname('http://www.xinhuanet.com//2019-11/23/c_1125266028.html'))
// .html
```

- `path.resolve([...path])`把路径或路径片段的序列解析为一个绝对路径。

```js
let arr = ['/sxt','qianduan', 'zhongji']
let info1 = path.resolve(...arr)
console.log(info1);
// D:\sxt\qianduan\zhongji
```

- `path.join([...paths])`方法使用平台特定的分隔符把全部定的`path`片段连接到一起，并规范化的路径。

```js
let arr = ['/sxt','qianduan', 'zhongji']
let info1 = path.resolve(...arr)
console.log(info1);
// D:\sxt\qianduan\zhongji
```

- `path.parse([...paths])`解析路径，可以将路径信息直接解析出来，解析出根路径，目录，扩展名，文件名称，文件名

```js
console.log(path.parse(__filename));
//	{ root: 'D:\\',
//  	dir: 'D:\\exces\\PracticeCode\\Node相关\\PATH',
//		base: 'nodePath2.js',
//		ext: '.js',
//  	name: 'nodePath2' 
//	}
```

  

**几个路径的含义：**

> `__dirname`：获取当前执行文件所在**目录**的完整目录名

```js
// 获得当前执行目录的完整路径
console.log(__dirname);
// D:\exces\PracticeCode\Node相关\PATH
let info2 = path.join(__dirname,'sxt','qianduan', 'zhongji')
console.log(info2);
// D:\exces\PracticeCode\Node相关\PATH\sxt\qianduan\zhongji
```

> `__filename`：获得当前执行**文件**的带有完整绝对路径的文件名

```js
// 获取当前的执行文件
console.log(__filename);
// D:\exces\PracticeCode\Node相关\PATH\nodePath2.js
```

> `process.cwd()`：获得当前执行**node命令**时候的文件夹目录名

```js
console.log(process.cwd(__filename));
//  D:\exces\PracticeCode\Node相关\PATH
```



#### 2.os

- `os.cpus()`获取操作系统的CPU信息。

```js
let os = require('os')
console.log(os);
```

- `os.totalmem()` 获取整个内存大小

```js
let os = require('os')
console.log(os.totalmem());
```



## URL模块

`url`核心模块在为我们解析url地址时提供了非常方便的API，常见包含有查询字符串的url地址解析。

1. `url.parse()`：可以解析一个url地址，通过传入第二个参数（`true`）把包含有查询字符串的query转换成对象。

```js
let httpUrl = "https://sale.vmall.com/hwmate.html?cid=10602"
let urlObj = url.parse(httpUrl)
console.log(urlObj);
/*
Url {
  protocol: 'https:', // 协议
  slashes: true,
  auth: null,
  host: 'sale.vmall.com',
  port: null,
  hostname: 'sale.vmall.com',  // 主机名
  hash: null, // 哈希值
  search: '?cid=10602',
  query: 'cid=10602',
  pathname: '/hwmate.html',
  path: '/hwmate.html?cid=10602',
  href: 'https://sale.vmall.com/hwmate.html?cid=10602'
}
*/
```

2.`url.resolve()`解析相当于基URL的目标URL。第一个参数：基URL，第二个参数：目标URL。

```js
let targetUrl = "http://www.taobao.com/"
httpUrl = "./sxt/qianduan/laochen.html"

let newUrl = url.resolve(targetUrl,httpUrl)
console.log(newUrl);
// http://www.taobao.com/sxt/qianduan/laochen.html
```













