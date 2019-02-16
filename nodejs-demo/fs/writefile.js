const fs = require('fs')
const path = require('path')

fs.writeFile(path.join(__dirname,'./text'), 'This is a test', {
  encoding: 'utf8'
}, err => {
  if (err) throw err;

  console.log('done!')
})

const buf = Buffer.from("this is a test.");

fs.writeFile(path.join(__dirname,'./text'), buf, err => {
  if (err) throw err;

  console.log('done!')
})