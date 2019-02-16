const fs = require('fs')
const path = require('path')

// stream --> 数据 & 方向
const rs = fs.createReadStream(path.join(__dirname,'./readstream.js'))

rs.pipe(process.stdout) // 控制台
