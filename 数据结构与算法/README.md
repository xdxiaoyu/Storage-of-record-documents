# 数据结构与算法

## 第一节

### 1、数据结构与算法概念

**数据结构**是计算机存储、组织数据的方式，指相互之间存在一种或多种特定关系的数据元素的集合。

> 数组、链表、树.....

**算法**：是一系列的计算步骤，用来将输入数据转化为输出结果。

> 即一个计算过程，解决问题的方法。



### 2、时间复杂度

**时间复杂度**：用来评估算法运行效率的一个式子

```c
EX1:
print('Hello World')		// O(1)
    
for i in range(n):
  print('Hello World')		// O(n)

for i in range(n):
  for j in range(n):
	print('Hello World')	// O(n^2)

for i in range(n):
  for j in range(n):
	for k in range(n):
	  print('Hello World')	// O(n^3)
          
EX2:         
print('Hello World')          
print('Hello Python')          
print('Hello Algorithm')		// O(3)错,简单的操作只要不上升到n的单位，都是O(1)
         
for i in range(n):
  print('Hello World')
  for j in range(n):
    print('Hello World')	// O(n^2+n)错,用大的单位,小的忽略不计.所以是 O(n^2)
        
EX3:
while n > 1:
  print(n)
  n = n // 2

// n=64的输出：64、32、16、8、4、2 
// 2^6 = 64  log₂64=6  时间复杂度记为O(log₂n)或者O(logn)
```

**小结**

- 时间复杂度是用来估计算法运行时间的一个式子（单位）。

- 一般来说，时间复杂度高的算法比复杂度低的算法慢。

- 常见的时间复杂度（按效率排序）

  O(1)<O(logn)<O(nlogn)<O(n^2)<O(n^2logn)<O(n^3)

- 复杂问题的时间复杂度

  O(n!)O(2^n)O(n^n)...



**如何简单快速地判断算法复杂度**

>- 快速判断算法复杂度（适用于绝大多数简单情况）
>
>  确定问题规模n
>
>  循环减半过程——>logn
>
>  k层关于n的循环——>n^k
>
>- 复杂情况：根据算法执行过程判断
>
>

### 3、空间复杂度

**空间复杂度**：用来评估算法内存占用大小的式子。



空间复杂度的表示方式与时间复杂度完全一样

> 算法使用了几个变量：O(1)
>
> 算法使用了长度为n的一维列表：O(n)
>
> 算法使用了m行n列的二维列表：O(mn)	



**空间换时间**（因为公司大部分都追求时间，让用户更快所以有些时候会牺牲内存来加快算法的时间。）



### 4、复习：递归





