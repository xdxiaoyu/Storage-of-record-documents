 

## 问：

1. 什么是 jwt，jwt 缺点有哪些
2. jwt 有哪些部分组成
3. jwt 与 token之间存在哪些区别
4. 如何纯手写一个 jwt
5. jwt 如何设计过期时间
6. jwt 与 oauht2.0之间的区别
7. 基于 jwt+oauht2.0实现单点登录

单点登录 SSO
Jwt  json web token
oauht2.0 开发协议



## token

### 	特征：

```js
临时且唯一  保证不能重复 缓存有效期机制
```

ex:只能门锁 临时密码 具有有效期，临时且唯一

### 	如何生成：

```js
uuid作为token
```

ex:生成token（uuid生成）作为Rediskey放入redis中，Redis的key作为有效期

### 	如何使用：

```js
token和sessionid非常相似，传统项目使用session存在缺陷：放入到服务端，
seesion	类似redis存放缓存内容
Session 中的 sessionid	类似token
不共享
大的项目都是基于token替代Session，Redis中。
```

用户登录 前后端分离项目

1. 验证账号密码，成功验证的情况下
2. 生成对应token 采用uuid
3. 将该token缓存到redis中，rediskey = token， value userId。
4. 最后返回token给客户端，客户端将token保存到cookie中

查询的情况下：

>  客户端每次请求的时候在请求头中传递该token，服务器端接收到Token，从Redis查找对应key对应的value userId。在根据userId查询用户信息返回给客户端。

使用token的情况下依赖于：

> 必须依赖服务端 redis

### 优点：

1. 能够隐藏参数真实性
2. 临时且唯一

### 缺点：

1. 依赖于服务端redis，高并发情况下频发查询增加redis压力



## Jwt

> Jwt 实际和token基本设计思想一样。

**Jwt：** json web token

> Json：数据交换格式	轻量级、跨语言、减少宽带、可读性高。

### 加密算法：

单向加密 MD5 只能暴力破解但是不可以解密

双向加密（对称加密）aes des

非对称加密 rsa

### Jwt主要组成：

第一部分：header头部 标记使用什么算法 HS256，RSA256

第二部分：Payload（载荷）jwt存放的数据

注意不能存放敏感数据



第三部分：PayLoad采用MD5加密之后的签名值

### 生成：

Base64.ENcode(header).Base64.ENcode(Payload).签名值

### 优点：

1. 减去服务端压力
2. Jwt查询效率比token高
3. 不容易被客户端篡改

### 缺点：

1. 如果一旦生成好一个jwt之后，后期是否可以销毁.
2. Jwt payload 数据多，占用服务器端带宽资源



## Jwt 与 token之间到底有哪些区别

1. token对应的内容存放在Redis中
2. Jwt 对应的payload数据存放在客户端



















































