const axios = require('axios')

let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page=1";



function getList () {
  axios({
    url: httpUrl,
    methods: 'GET',
  }).then(res => {
    console.log('获取的数据：',res.data);
  })
}

getList()

