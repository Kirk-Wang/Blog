const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname,'./'), (err, files) => {
  if (err) throw err

  console.log(files);
  
})