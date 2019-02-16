const fs = require('fs')
const path = require('path')

fs.unlink(path.join(__dirname,'./test.txt'), err => {}) // 删掉