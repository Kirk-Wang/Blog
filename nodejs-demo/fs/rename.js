const fs = require('fs')
const path = require('path')

fs.rename(path.join(__dirname,'./text'), path.join(__dirname,'./test.txt'), err => {
  if (err) throw err;
  
  console.log('done!')
})