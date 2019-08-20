### runSaga(...)

1. 设计状态
```js
state=0
```
2. 设计 Action
```js
{type: 'INCREMENT', payload: {step}}
{type: 'DECREMENT', payload: {step}}
{type: 'INCREMENT_ASYNC'}
{type: 'DECREMENT_ASYNC'}
```
3. 设计 Reducer
```js
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
```
4. 设计 Store 来管理状态
```js
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
```
5. 配置 store，连接到 UI
```js
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
```