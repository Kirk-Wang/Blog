const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;

const read = promisify(fs.readFile);

// read(path.join(__dirname,'./promisify.js'))
// .then( data => {
//   console.log(data.toString());
// })
// .catch(ex => {
//   console.log(ex)
// })

async function test() {
  try {
    const content = await read(path.join(__dirname, "./promisify.js"));
    console.log(content.toString());
  } catch (ex) {
    console.log(ex);
  }
}

test();
