function* gen() {
  console.log('enter……')
  const a = yield ['promise', new Promise((resolve, reject) => {
    resolve(1)
    // reject(new Error('haha error~~~'))
  })]
  console.assert(a === 1)
  const b = yield ['delay', 500]
  console.assert(b === '500ms elapsed')
  const c = yield ['ping']
  console.assert(c === "pong")
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
  } 
  else if(value[0] === 'delay') {
    setTimeout(() => next('500ms elapsed'), value[1])
  }
  else if(value[0] === 'ping') {
    next('pong')
  }
  else {
    next(new Error('无法识别的 Effect'), true)
  }
}

next()