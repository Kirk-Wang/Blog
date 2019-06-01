
function* range(start, end) {
  for (let index = start; index < end; index++) {
    yield index
  }
}

const iterator = range(1, 10)
function next() {
  const { done, value } = iterator.next(/* 参数 */)
  if (done) {
    return
  }
  console.log(value)
  if (value % 2 == 0) {
    setTimeout(next, value*300)
  } else {
    next()
  }
}

next()