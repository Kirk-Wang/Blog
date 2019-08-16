function take(eventName="*") {
  return {
    type: 'TAKE',
    payload: {
      eventName
    }
  }
}

function fork(fn) {
  return {
    type: 'FORK',
    payload: {
      fn
    }
  }
}

function put(action) {
  return {
    type: 'PUT',
    payload: {
      action
    }
  }
}

function delay(ms) {
  return {
    type: 'DELAY',
    payload: {
      ms,
    }
  }
}

function channel() {
  const takers = {}

  function take(eventName, taker) {
    takers[eventName] = taker
  }

  function put(action) {
    if(takers[action.type]) {
      const tempTaker = takers[action.type]
      delete takers[action.type]
      tempTaker(action)
    }
  }

  return {
    // 监听
    take,
    // 消费
    put
  }
}

const chan = channel()

function runTakeEffect(effect, cb) {
  const { eventName } = effect.payload
  chan.take(eventName, (action) => {
    // 决定当前 Saga 是否往下执行
    cb(action)
  })
}

function runPutEffect(effect, cb) {
  const { action } = effect.payload
  dispatch(action)
  cb()
}

function runDelayEffect(effect, cb) {
  const { ms } = effect.payload
  setTimeout(cb, ms)
}

function runForkEffect(effect, cb) {
  const { fn } = effect.payload
  runSaga(fn())
  cb() // 不去阻塞 Parent Saga
}

function runSaga(iterator) {
  function next(args) {
    const result = iterator.next(args)
    if (!result.done) {
      const effect = result.value
      switch (effect.type) {
        case "TAKE": {
          runTakeEffect(effect, next)
        } break;
        case "FORK": {
          runForkEffect(effect, next)
        } break;
        case "PUT": {
          runPutEffect(effect, next)
        } break;
        case "DELAY": {
          runDelayEffect(effect, next)
        } break;
      }
    }
  }
  next()
}

function* incrementSaga() {
  while(true) {
    const action = yield take('INCREMENT')
    yield delay(500)
    yield put(action)
  }
}

function* decrementSaga() {
  while(true) {
    const action = yield take('DECREMENT')
    yield delay(400)
    yield put(action)
  }
}

function* rootSaga() {
  yield fork(incrementSaga)
  yield fork(decrementSaga)
}

function dispatch(action) {
  const input = document.querySelector('input')
  input.value = +(input.value) + action.payload.step
}

document.addEventListener('DOMContentLoaded',() => {
  const btnInc = document.querySelector('#increment')
  const btnDec = document.querySelector('#decrement')
  // 生成一系列 takers
  runSaga(rootSaga())

  btnInc.addEventListener('click', () => {
    // 消费 taker
    const action = {
      type: 'INCREMENT',
      payload: {
        step: 1
      }
    }
    chan.put(action)
  })
  btnDec.addEventListener('click', () => {
    const action = {
      type: 'DECREMENT',
      payload: {
        step: -1
      }
    }
    chan.put(action)
  })
})