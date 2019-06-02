function* gen() {
  console.log('enter……')
  const a = yield ['promise', new Promise((resolve, reject) => {
    resolve(1)
    // reject(new Error('haha error~~~'))
  })]
  console.assert(a === 1)
  console.log('exit……')
}

const iterator = gen()

function next(args, isErr) {
  let result 
  if(isErr) {
    result = iterator.throw(args)
  } else {
    result = iterator.next(args)
  }
  const { done, value } = result

  if (done) {
    return
  }
  if (value[0] === 'promise') {
    value[1].then(resolveValue => next(resolveValue), error => next(error, true))
  } else {
    next(new Error('无法识别的 Effect'), true)
  }
}

next()