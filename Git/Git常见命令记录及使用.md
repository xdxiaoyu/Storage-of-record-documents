```js
// 查看git日志
$ git log				   // 从近到远显示，按Q退出日志
$ git log --pretty=oneline	// 简洁日志

// 撤销commit
$ git reset --hard 提交id		// 删除工作空间改动代码，撤销commit，撤销git add .(恢复至上次commit状态)
		   --mixed			// 不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
            --soft			 // 不删除工作空间改动代码，撤销commit，不撤销git add .

$ git fetch				// 获取远程分支的新建分支
$ git checkout `分支名`   // 切换分支

// 创建新分支，同步仓库
$ git checkout -b `分支名`
$ git push origin `分支名`


$ git stash	save "save message"		// 暂存更改的时，添加备注方便查找。只`git stash`也可
$ git stash list 					// 查看stash了哪些储存
$ git stash pop		// 还原更改，将缓存栈中对应的stash删除，默认第一个。应用并删除其第二个： `git stash pop stash@{2}`
$ git stash apply	// 应用但不会删除,用法和上述一样
$ git stash clear	// 删除所有缓存
$
$
```


