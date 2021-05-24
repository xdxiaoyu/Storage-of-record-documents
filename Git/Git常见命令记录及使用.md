```js
// 查看git日志
$ git log	// 从近到远显示，按Q退出日志
$ git log --pretty=oneline	// 简洁日志

// 撤销commit
$ git reset --hard 提交id		// 删除工作空间改动代码，撤销commit，撤销git add .(恢复至上次commit状态)
		   --mixed			// 不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
            --soft			 // 不删除工作空间改动代码，撤销commit，不撤销git add .
            
$ git fetch		// 获取远程分支的新建分支
$ git checkout xx	// 切换分支
```



### 

