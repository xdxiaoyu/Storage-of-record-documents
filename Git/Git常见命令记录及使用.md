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
$ git stash drop stash@{0} // apply选项只尝试应用储藏的工作--储藏的内容任然在栈上。要移除它，可以使用git stash drop,加上你希望移除的储藏名字：

// Git提交多个远程仓库
// 本身有一个远程仓库，使用命令增加一个远程仓库
$ git remote set-url --add origin https:/\/github.com/dingxingxing/vue_shop.git // 使用https地址，导致每次pull都需要输入账号密码才能成功，所以换成ssh协议地址可以避免每次提交都输账号密码
$ git remote set-url --add origin git@github.com:dingxingxing/vue_shop.git

$ git remote -v // 使用 git remote -v 可查看远程仓库地址
```

```jade
// 使用.git/config查看git配置
$ .git/config
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://gitee.com/dingxiaoxing/vue_shop.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@github.com:dingxingxing/vue_shop.git
[branch "master"]
	remote = origin
	merge = refs/heads/master
```
