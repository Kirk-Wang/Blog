const { parse, format } = require("path");
const filePath = '/usr/local/node_modules/n/package.json'
const ret = parse(filePath)
console.log(ret)

console.log(format(ret))