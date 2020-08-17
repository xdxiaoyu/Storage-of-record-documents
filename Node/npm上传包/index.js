/*
 * @Descripttion: 
 * @version: 
 * @Author: dxiaoxing
 * @Date: 2020-08-17 15:31:59
 * @LastEditors: dxiaoxing
 * @LastEditTime: 2020-08-17 15:39:04
 */
let { readdir } = require('xiaoyufs')

readdir('../').then((files) => {
  console.log(files)
})

async function test() {
  let files = await readdir('../../')
  console.log(files);
}
test()