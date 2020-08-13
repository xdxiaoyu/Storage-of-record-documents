/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-12 21:24:58
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-13 17:33:42
 */

const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
// 获取HTML文档的内容，内容的获取跟jquery一样


let httpUrl = "https://www.doutula.com/article/list/?page=1";

// 获取页面总数
async function getNum() {
  res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  let btnLength = $('.pagination li').length
  let allNum = $('.pagination li').eq(btnLength - 2).find('a').text()
  console.log(allNum);
  return allNum
}

async function spider() {
  // 获取所有页面的总数
  let allPageNum = await getNum()
  for(let i=1;i<= 50;i++) {
    getListPage(i)
  }
}

async function getListPage(pageNum) {
  let httpUrl = "https://www.doutula.com/article/list/?page=" + pageNum;
  let res = await axios.get(httpUrl)
  // cheerio解析html文档
  let $ = cheerio.load(res.data)
  // 获取当前页面的所有的表情页面的链接
  $('#home .col-sm-9>a').each((i, element) => {
    let pageUrl = $(element).attr('href')
    let title = $(element).find('.random_title').text()
    let reg = /(.*?)\d/igs;
    title = reg.exec(title)[1]
    fs.mkdir(`./img/${title}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('成功创建目录：' + './img/' + title);
      }
    })
    parsePage(pageUrl, title)
  })
}


async function parsePage(url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, element) => {
    let imgUrl = $(element).attr('src')
    // 获取扩展名
    let extName = path.extname(imgUrl)
    // 图片写入的路径和名字
    let imgPath = `./img/${title}/${title}-${i}${extName}`
    // 创建图片可写流
    let ws = fs.createWriteStream(imgPath)
    axios.get(imgUrl, { responseType: 'stream' }).then(res => {
      // 通过管道流入到可写流的来源流
      res.data.pipe(ws)
      console.log('图片加载完成:', imgPath);
      // res.data.on('close',() => {
      //   ws.close()
      // })
    })
  })
}


spider()