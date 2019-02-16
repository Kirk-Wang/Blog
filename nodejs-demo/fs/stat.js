const fs = require('fs')
const path = require('path')

fs.stat(path.join(__dirname,'./stat.js'), (err, stats) => {
  if (err) throw err;

  console.log(stats.isFile())
  console.log(stats.isDirectory());
  
  console.log(stats);
  
})