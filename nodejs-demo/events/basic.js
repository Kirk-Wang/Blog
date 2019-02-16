const { EventEmitter } = require('events')

class CustomEvent extends EventEmitter {

}

const ce = new CustomEvent()

ce.on('test', () => {
  console.log("this is a test!");
})

setInterval(() => { ce.emit('test') }, 5000)