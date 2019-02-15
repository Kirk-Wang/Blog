const { basename, dirname, extname } = require("path");

const filePath = "/usr/local/bin/no.txt"

console.log(basename(filePath))

console.log(dirname(filePath))

console.log(extname(filePath))
