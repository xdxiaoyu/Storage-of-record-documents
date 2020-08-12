
const cheerio = require('cheerio')
const axios = require('axios')
// 获取HTML文档的内容，内容的获取跟jquery一样


let httpUrl = "https://www.doutula.com/article/list/?page=1"
axios.get(httpUrl).then(res => {
  // console.log(res.data);
  // cheerio解析html文档
  let $ = cheerio.load(res.data)
  // 获取当前页面的所有的表情页面的链接
  $('#home .col-sm-9>a').each((i,element) => {
    console.log($(element).attr('href'));
  })
})


async function parsePage(url) {
  
}