# 储存(Stashing)

> 经常有这样的事情发生，当你正在进行项目中某一部分的工作，里面的东西处于一个比杂乱的状态，而你想转到其它分支上进行一些工作。问题是莫不想提交进行了一半的工作，否则你无法回到这个工作点，解决这个问题的办法就是git stash命令。

```javascript
// 储存这些变更，往堆栈推送一个新的储藏
$ git stash

// 这时方便切换到其他分支上工作；你的变更都保存在栈上。查看现有储存
$ git stash list
//ex: stash@{0}: WIP on dev: 38fb00e 同城配送修改

// 当你在另一个分支上工作完成以后，回到刚刚的分支重新应用实施的储藏
$ git stash apply

// apply选项只尝试应用储藏的工作--储藏的内容任然在栈上。要移除它，可以使用git stash drop,加上你希望移除的储藏名字：
$ git stash drop stash@{0}

// 也可以运行 git stash pop来重新应用储藏，同时立刻将其从堆栈中移走
$ git stash pop

//删除所有缓存的stash
$ git stash clear
```

# Git提交多个远程仓库

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

本身有一个远程仓库，使用命令增加一个远程仓库

```JavaScript
$ git remote set-url --add origin https://github.com/dingxingxing/vue_shop.git
// 使用https地址，导致每次pull都需要输入账号密码才能成功，所以换成ssh协议地址可以避免每次提交都输账号密码

$ git remote set-url --add origin git@github.com:dingxingxing/vue_shop.git

// 使用 git remote -v 可查看远程仓库地址
$ git remote -v
```

