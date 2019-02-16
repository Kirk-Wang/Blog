const fs = require('fs')
const path = require('path')

fs.rmdir(path.join(__dirname,'test'), err => {})