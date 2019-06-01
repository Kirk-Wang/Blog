
function* range(start, end) {
  for (let i = start; i < end; i++) {
    const response = yield i
    console.log(`response of ${i} is ${response}`)
  }
}

const iterator = range(1, 10)

function next(args, isErr) {
  let result
  if (isErr) {
    result = iterator.throw(args)
  } else{
    result = iterator.next(args)
  }
  const { done, value } = result
  if(done) {
    return;
  }
  console.log(`getting ${value}`)
  if (value === 5) {
    next(new Error('5 is bad input'), true)
  } else {
    setTimeout(() => next(value*2), 1000)
  }
}

next()