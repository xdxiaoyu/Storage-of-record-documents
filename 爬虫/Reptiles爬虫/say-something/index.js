const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')


// 将延迟函数封装成promise对象
function lcWait(milliSecondes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功执行延迟函数，延迟：" + milliSecondes)
    })
  }, milliSecondes)
}

async function getListPage(pageNum) {
  let url = `https://anime-pictures.net/pictures/view_posts/${pageNum}?lang=en`
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  fs.mkdir('./img', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('成功创建目录');
    }
  })
  $('#posts .posts_block .img_block_big .img_cp').each((i, elements) => {
    let pageUrl = $(elements).attr('src')
    console.log('pageUrl:', pageUrl);
    lcWait(400 * i).then(() => {
      parsePage(pageUrl, i)
    })
  })
}

async function parsePage(url, i) {
  // 获取文件扩展名
  let extName = path.extname(url)
  // 随机时间戳
  let createTimestamp = parseInt(new Date().getTime() / 1000) + '';
  // 图片写入路径
  let imgPath = `./img/小刘${i}-${createTimestamp}${extName}`
  // 创建写入流
  let ws = fs.createWriteStream(imgPath)

  axios.get(`https:${url}`, { responseType: 'stream' }).then(res => {
    // 管道流写入
    res.data.pipe(ws)
    console.log('图片加载完成:', imgPath);
    res.data.on('close',() => {
        ws.close()
      })
  }).catch(err => {
    console.log(err);
  })
}


async function spider() {
  for(let i =0; i <=5; i++) {
    lcWait(2000 * i).then(() => {
      getListPage(i)
    })
  }
}

spider()