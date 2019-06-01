
function* range(start, end) {
  for (let index = start; index < end; index++) {
    yield index
  }
}

const iterator = range(1, 10)

while(true) {
  const { done, value } = iterator.next(/* 参数 */)
  if(done) {
    break;
  }
  if(value === 5) {
    iterator.throw(new Error('5 is bad input'))
  }
  console.log(value)
}