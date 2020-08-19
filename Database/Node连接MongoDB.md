MongoDB是一种文档导向数据库管理系统，有C++撰写而成

如果你还没有MongoDB的基本知识，可以查看上一篇文章学习

## 安装驱动

```js
$ cnpm install mongodb
```

## 创建数据库

要在MongoDB中创建一个数据库，首先我们需要创建一个MongoClient对象，然后配置好指定的url和端口号。

如果数据库不存在。MongoDB将创建数据库并建立连接。

## 创建连接

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    console.log('数据库已创建')
    db.close()
})
```

useNewUrlParser,useUnifiedTopology是使用最新的url解析器，避免mongo报警告错误。

------



## 数据库操作（CURD）

与MySQL不同的是MongoDB会自动创建数据库和集合，所以使用前我们不需要手动去创建

### 插入数据

#### 插入一条数据

> insertOne()

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    var dbo = db.db('xiaoyu')
    var myobj = { username:"小羽", type:"帅",like:['唱','跳','开车','搞代码'] }
    dbo.collection("user").insertOne(myobj,(err,res) => {
        if(err) throw err
        console.log('文档插入成功')
        db.close()
    })
})
```



#### 插入多条数据

> insertMany()

```js
var MongoClinet = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    var dbo = db.db('user')
    var myobj = [
    { username: "小羽", type: "帅", like: ['唱', '跳', '开车', '搞代码'] },
    { username: "吴亦凡", type: "帅", like: ['唱', '跳', '大碗宽面'] },
    { username: "肖战", type: "帅", like: ['唱', '跳', '爱粉丝'] },
  ];
    dbo.collection('users').insertMany(myobj,(err,res) => {
        if(err) throw err
        console.log('插入的文档数量为：'+ res.insertedCount)
        db.close()
    })
})
```



### 查询数据

可以使用find()来查找数据，find()可以返回匹配条件的所有数据。如果未指定条件，find()返回集合中所有数据。

#### find()

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    var dbo = db.db('xiaoyu')
    dbo.collection('user').find({}).toArray((err,result) => {
        // 返回集合中所有数据
        if(err) throw err
        console.log(result)
        db.close()
    })
})
```



#### 查询指定条件

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    var dbo = db.db('xiaoyu')
    var whereStr = {username: '小羽'} // 查询条件
    dbo.collection("user").find({whereStr}).toArray((err,result) => {
        if(err) throw err
        console.log(result);
        db.close();
    })
})
```



#### 更新数据

##### 更新一条数据

> updateOne()

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
    if(err) throw err
    var dbo = db.db('xiaoyu')
    var whereStr = {username: '小羽'} // 查询条件
    var updateStr = { $set: {"type": "小胖"} }
    dbo.collection("user").updateOne({whereStr,updateStr},(err,result) => {
        if(err) throw err
        console.log('文档更新成功');
        db.close();
    })
})
```

##### 更新多条数据

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var whereStr = {username: '小羽'} // 查询条件
    var updateStr = {$set:{type: '胸怀天下' }}
    dbo.collection('user').pudateMany(whereStr,updateStr, (err, res) => {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
    })
})
```



### 删除数据

#### 删除一条数据

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var whereStr = {username: '小羽'} // 查询条件
    dbo.collection('user').deleteOne(whereStr, (err, res) => {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    })
})
```



#### 删除多条数据

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var whereStr = {username: '小羽'} // 查询条件
    dbo.collection('user').deleteMany(whereStr, (err, res) => {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    })
})
```



### 排序

排序使用sort()方法，该方法接受一个参数，规定是升序(1)还是降序(-1)

例如：

```js
{ type: 1 } // 按 type 字段升序
{ type: -1 } // 按 type 字段降序
```

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var mysort = {type: 1}
    dbo.collection('user').find().sort(mysort).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    })
})
```



### 查询分页

如果要设置指定的返回条数可以使用 **limit()** 方法，该方法只接受一个参数，指定了返回的条数。

#### limit()

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var mysort = {type: 1}
    dbo.collection('user').find().limit(2).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    })
})
```

#### skip()

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var mysort = {type: 1}
    dbo.collection('user').find().skip(2).limit(2).toArray((err, res) => {
        // 跳过前面两条数据，读取两条数据
        if (err) throw err;
        console.log(res);
        db.close();
    })
})
```



### 删除集合

我们可以使用drop()方法来删除集合

```js
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db) => {
     if(err) throw err
    var dbo = db.db('xiaoyu')
    var mysort = {type: 1}
    dbo.collection('user').find().skip(2).limit(2).toArray((err, res) => {
        // 跳过前面两条数据，读取两条数据
        if (err) throw err;
        console.log(res);
        db.close();
    })
})
```



### $lookup 实现左连接(多表查询)

创建集合 orders

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let obj = { _id: 1, product_id: 154, status: 1 }
MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xiaoyu");
    dbo.collection("orders").insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
```

创建集合 product

```js
MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xiaoyu");
    var myobj =  [
      { _id: 154, name: '笔记本电脑' },
      { _id: 155, name: '耳机' },
      { _id: 156, name: '台式电脑' }
    ];
    dbo.collection("products").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
```

使用$lookup查询

```js
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("xiaoyu");
  dbo.collection("orders").aggregate([
    {
      $lookup:
      {
        from: 'products',            // 右集合
        localField: 'product_id',    // 左集合 join 字段
        foreignField: '_id',         // 右集合 join 字段
        as: 'orderdetails'           // 新生成字段（类型array）
      }
    }
  ]).toArray((err, res) => {
    if (err) throw err
    console.log(JSON.stringify(res));
    // [{"_id":1,"product_id":154,"status":1,"orderdetails":[{"_id":154,"name":"笔记本电脑"}]}]
    db.close();
  })
});
```

