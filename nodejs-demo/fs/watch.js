const fs = require('fs')
const path = require('path')

fs.watch(path.join(__dirname,'./'),{
  recursive: true
}, (eventType, filename) => {
  console.log(eventType, filename)
})
