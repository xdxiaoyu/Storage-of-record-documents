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

