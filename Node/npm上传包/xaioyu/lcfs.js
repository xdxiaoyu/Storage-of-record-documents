/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-09 10:17:56
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-17 15:40:33
 */

let fs = require('fs')
function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, `${content}\n`, { flag: 'a', encoding: "utf-8" }, function (err) {
      if (err) {
        reject(err)
        // console.log(err,'写入内容出错');
      } else {
        resolve(err)
        // console.log('写入内容成功');
      }
    })
  })
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: "utf-8" }, (err, data) => {
      if (err) {
        // console.log(err);
        // 失败执行的内容
        reject(err)
      } else {
        // console.log(data);
        resolve(data)
      }
      // console.log(456);
    })
  })
}

function mkdir(path) {
  return new Promise((resolve,reject) => {
    fs.mkdir(path, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve('成功创建目录')
      }
    })
  })
}

function rename(oldPath,newPath) {
  return new Promise((resolve,reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if(error) {
        reject(error)
      } else {
        resolve('rename success')
      }
    })
  })
}

function readdir(path,options) {
  return new Promise((resolve,reject) => {
    fs.readdir(path, options, (error,files) => {
      if(error) {
        reject(error)
      } else {
        resolve(files)
      }
    })
  })
}


module.exports = { writeFile, readFile, mkdir, rename, readdir }