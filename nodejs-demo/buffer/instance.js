

const buf = Buffer.from('This is a test!')
console.log(buf.length)

const buf2 = Buffer.alloc(10)
buf2[0] = 2;
console.log(buf2.length)

console.log(buf.toString('base64'));
