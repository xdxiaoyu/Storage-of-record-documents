/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-09 10:17:56
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-12 20:29:48
 */

let fs = require('fs')
const { resolve } = require('path')
function fsWritefs(path, content) {
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

function fsRead(path) {
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

function fsDir(path) {
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

module.exports = { fsWritefs, fsRead, fsDir }