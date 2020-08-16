/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-13 19:15:16
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-16 13:47:23
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')



// 目标：下载音乐
// 1获取音乐相关的信息，通过音乐相关的信息获取mp3地址
// 2如何获取大量的音乐信息，通过获取音乐列表
// 3通过音乐的分类页，获取音乐列表


// 获取音乐
async function getPage(num) {
  let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page=" + num
  let res = await axios.get(httpUrl)

  res.data.list.forEach((item, i) => {
    let title = item.sound.name
    let mp3Url = item.sound.source
    let filename = path.parse(mp3Url).name

    let content = `${title},${mp3Url},${filename}\n`
    fs.writeFile('music.txt', content, {flag:'a'},() => {
      console.log('写入完成：'+ title);
    })
    // console.log(title);
    // console.log(mp3Url);
    download(mp3Url,filename)
  })
}

// 下载音乐
async function download(mp3Url, filename) {
  let res = await axios.get(mp3Url, { responseType: "stream" })
  let ws = fs.createWriteStream('./mp3/' + filename + '.mp3')
  res.data.pipe(ws)
  // res.data.on('close',() => {
  //   ws.close()
  // })
}

for(i=1;i<=5; i++) {
  getPage(i)
}

// 验证代码
// axios.get('https://www.dytt8.net/index.htm').then(res => {
//   console.log(res.data);
// })
