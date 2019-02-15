const { join } = require("path");

console.log(join("/usr", "local", "bin/"));

console.log(join("/usr", "../local", "bin/"));
