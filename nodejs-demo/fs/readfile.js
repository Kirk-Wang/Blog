

const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'../test.js'), 'utf8',(err, data) => {
  if (err) throw err

  console.log(data)
})

const data = fs.readFileSync(path.join(__dirname,'../path/join.js'), 'utf8')
console.log(data);
