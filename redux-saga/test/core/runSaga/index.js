
function reducer(state = 0, action) {
  const { type, payload } = action
  switch (type) {
    case 'INCREMENT': {
      return state + payload.step
    } break;
    case 'DECREMENT': {
      return state - payload.step
    } break;
    default:
      return state;
  }
}

function createStore(reducer) {
  let state, listener
  const dispatch = action => {
    nextState = reducer(state, action)
    if (nextState !== state && listener) {
      state = nextState
      listener()
    }
    return action
  }
  const getState = () => state
  const subscribe = cb => listener = cb
  dispatch({ type: 'INIT' })
  return { dispatch, getState, subscribe }
}

function configStore() {
  const render = (input$ => 
    state => input$.value = state
  )(document.querySelector('input'))
  const store = createStore(reducer)
  store.subscribe(() => {
    render(store.getState())
  })
  store.dispatch({type:'UNKNOWN'})
  return store
}

function* root() {
  const { all, fork} = ReduxSagaEffects
  yield all([fork(incAsync), fork(decAsync)])
}

function* incAsync() {
  const { take, delay, put} = ReduxSagaEffects
  while(true) {
    yield take('INCREMENT_ASYNC')
    yield delay(500)
    yield put({ type: 'INCREMENT', payload: { step: 3 } })
  }
}

function* decAsync() {
  const { take, delay, put} = ReduxSagaEffects
  while(true) {
    yield take('DECREMENT_ASYNC')
    yield delay(1000)
    yield put({ type: 'DECREMENT', payload: { step: 3 }  })
  }
}

let { dispatch, getState } = configStore()
const channel = ReduxSaga.stdChannel()
const IO = {
  channel,
  dispatch,
  getState
}

const enhancer = next => action => {
  // hit reducers
 result = next(action)
 channel.put(action)
 return result
}
dispatch = enhancer(dispatch)

task = ReduxSaga.runSaga(IO, root)

document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'inc': {
      dispatch({type: 'INCREMENT_ASYNC'})
      console.log(`task.isRunning()`, task.isRunning())
    } break;
    case 'dec': {
      dispatch({type: 'DECREMENT_ASYNC'})
      console.log(`task.isRunning()`, task.isRunning())
    } break;
  }
})