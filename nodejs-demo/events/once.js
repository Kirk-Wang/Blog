const { EventEmitter } = require('events')

class CustomEvent extends EventEmitter {}

const ce = new CustomEvent()