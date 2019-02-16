const fs = require('fs')
const path = require('path')

// stream --> 数据 & 方向
const ws = fs.createWriteStream(path.join(__dirname,'./test.txt'))

const tid = setInterval(() => {
  const num = parseInt(Math.random() * 10);
  if (num < 9) {
    ws.write(num+'')
  } else {
    clearInterval(tid)
    ws.end() // 这里就会触发 finish 事件
  }
}, 200)

ws.on('finish',  () => {
  console.log('done!');
})
