# HTTP相关

## 1.HTTP请求报文

### ①. 请求行

method url

GET

POST

### ②  多个请求头

Host: www.baidu.com

Cookie: BAIDUID=ADA21BHF;BIDUPSID=AD3B0FR

Content-Type: application/x-www-form-urlencoded 或者 application/json

> `Content-Type` 告诉服务端请求体的内容格式

### ③ 请求体

username=tom&pwd=123

{"username":"tom","pwd":123}



## 2.HTTP响应报文

### ① 响应状态行

 status statusText

### ②多个响应头

Content-Type: text/html;charset=utf-8 

Set-Cookie: BD_CK_SAM=1;path=/

> 响应什么格式的文本，例(html格式的文本)
>
> Set-Cookie 服务端携带session给客户端

### ③响应体

html 文本/json文本/js/css/图片...