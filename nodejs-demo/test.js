setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('timeout'), 0);
process.nextTick(() => {
    console.log('nextTick1')
    process.nextTick(() => console.log('nextTick2'))
});
// while(true) {
//   process.nextTick(() => console.log('nextTick3'))
// }