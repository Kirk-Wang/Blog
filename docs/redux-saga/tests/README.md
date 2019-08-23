Redux-Saga 测试用例阅读：

**目标：熟悉 Redux-Saga 所有用法**

## /packages/core/__tests__
阅读顺序不分先后

### runSaga.js
- [x] test('runSaga'),[demo](./core/runSaga/)

### middleware.js
`({getState, dispatch}) => next => action => action`
- [x] test('middleware output')
  * middleware factory must return a function to handle {getState, dispatch}
  * middleware returned function must take exactly 1 argument
  * next handler must return a function to handle action
  * next handler must take exactly 1 argument
  * next handler must return a function to handle action
  * action handler must take exactly 1 argument
- [x] test('middleware's action handler output')
  * action handler must return the result of the next argument
- [x] test('middleware.run')
  * middleware.run must throw an Error when executed before the middleware is connected to a Store
  * middleware.run must return a Task Object
  * middleware must run the Saga and provides it with the given arguments
- [x] test('middleware options')
  * middleware factory must raise an error if `options.onError` is not a function
- [x] test('enhance channel.put with an emitter')
  * saga must be able to take actions emitted by middleware's custom emitter
- [x] test('middleware.run saga arguments validation')
  * saga argument must be a Generator function

### taskToPromise.js
- [x] test('calling toPromise() of an already completed task')
- [x] test('calling toPromise() before a task completes')
- [x] test('calling toPromise() of an already aborted task')
- [x] test('calling toPromise() before a task aborts')
- [x] test('calling toPromise() of an already cancelled task')
- [x] test('calling toPromise() of before a task gets cancelled')

### channel-recipes.js
- [x] test('action channel')
  * Sagas must take consecutive actions dispatched synchronously on an action channel even if it performs blocking calls
- [x] test('error check when constructing actionChannels')
- [x] test('action channel generator')
- [x] test('action channel generator with buffers')
- [x] test('channel: watcher + max workers')
  * Saga must dispatch to free workers via channel

### channel.js
- [x] test('Unbuffered channel')
  * channel should reject undefined messages
  * channel must notify takers
  * channel must discard cancelled takes
  * closing a channel must resolve all takers with END
  * closed channel must resolve new takers with END
  * channel must reject messages after being closed
- [x] test('buffered channel')
  * channel must queue pending takers if there are no buffered messages
  * channel must resolve the oldest pending taker with a new message
  * channel must buffer new messages if there are no takers
  * channel must resolve new takers if there are buffered messages
  * closing an already closed channel should be noop
  * putting on an already closed channel should be noop
  * closed channel must resolve new takers with any buffered message
  * closed channel must resolve new takers with END if there are no buffered message
- [x] test('event channel')
  * eventChannel should throw if subscriber does not return a function to unsubscribe
  * eventChannel must notify takers on a new action
  * eventChannel must notify takers only once
  * eventChannel must notify all pending takers on END
  * eventChannel must notify all new takers if closed
- [x] test('unsubscribe event channel')
  * eventChannel should call unsubscribe when channel is closed
  * eventChannel should call unsubscribe when END event is emitted synchronously
  * eventChannel should call unsubscribe when END event is emitted asynchronously
- [x] test('expanding buffer')
  * expanding buffer should be able to buffer more items than its initial limit

### scheduler.js
- [x] test('scheduler executes all recursively triggered tasks in order')
- [x] test('scheduler when suspended queues up and executes all tasks on flush')

### monitoring.js
- [x] test('saga middleware monitoring')
  * sagaMiddleware must notify the saga monitor of Effect creation and resolution
  * sagaMiddleware must notify the saga monitor of dispatched actions
- [x] test('runSaga monitoring')
  * runSaga must notify the saga monitor of Effect creation and resolution
  * runSaga must notify the saga monitor of dispatched actions
- [x] test('saga monitors without all functions')

### interpreter/base.js
- [x] test('saga iteration')
- [x] test('saga error handling')
- [x] test('saga output handling')
- [x] test('saga yielded falsy values')

### interpreter/call.js
- [x] test('saga handles call effects and resume with the resolved values')
- [x] test('saga handles call effects and throw the rejected values inside the generator')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (1)')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (2)')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (2)')

### interpreter/cps.js
- [x] test('saga cps call handling')
  * saga must fulfill cps call effects
- [x] test('saga synchronous cps failures handling')
  * saga should inject call error into generator
- [x] test('saga cps cancellation handling')
  * saga should call cancellation function on callback

### interpreter/put.js
- [x] test('saga put handling')
  * saga must handle generator puts
- [x] test('saga put in a channel')
  * saga must handle puts on a given channel
- [x] test('saga async put's response handling')
  * saga must handle async responses of generator put effects
- [x] test('saga error put's response handling')
  * saga should bubble thrown errors of generator put effects
- [x] test('saga error putResolve's response handling')
  * saga must bubble thrown errors of generator putResolve effects
- [x] test('saga nested puts handling')
  * saga must order nested puts by executing them after the outer puts complete
- [x] test('puts emitted while dispatching saga need not to cause stack overflow')
  * this saga needs to run without stack overflow
- [x] test('puts emitted directly after creating a task (caused by another put) should not be missed by that task')
- [x] test('END should reach tasks created after it gets dispatched')

### interpreter/take.js
- [ ] test('saga take from default channel')
- [ ] test('saga take from provided channel')
- [ ] test('saga take from eventChannel')

### interpreter/takeSync.js
- [ ] test('synchronous sequential takes')
- [ ] test('synchronous concurrent takes')
- [ ] test('synchronous parallel takes')
- [ ] test('synchronous parallel + concurrent takes')
- [ ] test('startup actions')
- [ ] test('synchronous takes + puts')
- [ ] test('synchronous takes (from a channel) + puts (to the store)')
- [ ] test('inter-saga put/take handling')
- [ ] test('inter-saga put/take handling (via buffered channel)')
- [ ] test('inter-saga send/acknowledge handling')
- [ ] test('inter-saga send/acknowledge handling (via unbuffered channel)')
- [ ] test('inter-saga send/acknowledge handling (via buffered channel)')
- [ ] test('inter-saga fork/take back from forked child 1')
- [ ] test('deeply nested forks/puts')
- [ ] test('inter-saga fork/take back from forked child 2')
- [ ] test('put causing sync dispatch response in store subscriber')
- [ ] test('action dispatched in root saga should get scheduled and taken by a "sibling" take')
- [ ] test('action dispatched synchronously in forked task should be taken a following sync take')

### interpreter/fork.js
- [ ] test('should not interpret returned effect. fork(() => effectCreator())')
- [ ] test('should not interpret returned effect. yield fork(takeEvery, 'pattern', fn)')
- [ ] test('should interpret returned promise. fork(() => promise)')
- [ ] test('should handle promise that resolves undefined properly. fork(() => Promise.resolve(undefined))')
- [ ] test('should interpret returned iterator. fork(() => iterator)')

### interpreter/forkjoin.js
- [ ] test('saga fork handling: generators')
- [ ] test('saga join handling : generators')
- [ ] test('saga fork/join handling : functions')
- [ ] test('saga fork wait for attached children')
- [ ] test('saga auto cancel forks on error')
- [ ] test('saga auto cancel forks on main cancelled')
- [ ] test('saga auto cancel forks if a child aborts')
- [ ] test('saga auto cancel parent + forks if a child aborts')
- [ ] test('joining multiple tasks')

### interpreter/forkJoinErrors.js
- [ ] test('saga sync fork failures: functions')
- [ ] test('saga sync fork failures: functions/error bubbling')
- [ ] test('saga fork's failures: generators')
- [ ] test('saga sync fork failures: spawns (detached forks)')
- [ ] test('saga detached forks failures')

### interpreter/race.js
- [ ] test('saga race between effects handling')
- [ ] test('saga race between array of effects handling')
- [ ] test('saga race between effects: handle END')
- [ ] test('saga race between sync effects')
- [ ] test('saga race cancelling joined tasks')

### interpreter/select.js
- [ ] test('saga select/getState handling')

### interpreter/all.js
- [ ] test('saga parallel effects handling')
  * saga must fulfill declarative call effects
- [ ] test('saga empty array')
- [ ] test('saga parallel effect: handling errors')
- [ ] test('saga parallel effect: handling END')
- [ ] test('saga parallel effect: named effects')

### interpreter/cancellation.js
- [ ] test('saga cancellation: call effect')
- [ ] test('saga cancellation: forked children')
- [ ] test('saga cancellation: take effect')
- [ ] test('saga cancellation: join effect (joining from a different task)')
- [ ] test('saga cancellation: join effect (join from the same task's parent)')
- [ ] test('saga cancellation: parallel effect')
- [ ] test('saga cancellation: race effect')
- [ ] test('saga cancellation: automatic parallel effect cancellation')
- [ ] test('saga cancellation: automatic race competitor cancellation')
- [ ] test('saga cancellation:  manual task cancellation')
- [ ] test('saga cancellation: nested task cancellation')
- [ ] test('saga cancellation: nested forked task cancellation')
- [ ] test('cancel should be able to cancel multiple tasks')
- [ ] test('cancel should support for self cancellation')
- [ ] test('should bubble an exception thrown during cancellation')
- [ ] test('task should end in cancelled state when joining cancelled child')
- [ ] test('task should end in cancelled state when parent gets cancelled')

### interpreter/channel.js
- [ ] test('saga create channel for store actions')
- [ ] test('saga create channel for store actions (with buffer)')

### interpreter/flush.js
- [ ] test('saga flush handling')

### interpreter/context.js
- [ ] test('saga must handle context in dynamic scoping manner')

### interpreter/effectMiddlewares.js
- [ ] test('effectMiddlewares - single')
- [ ] test('effectMiddlewares - multiple')
- [ ] test('effectMiddlewares - nested task')

### interpreter/iterators.js
- [ ] test('saga nested iterator handling')

### interpreter/onerror.js
- [ ] test('saga onError is optional (the default is console.error)')
- [ ] test('saga onError is called for uncaught error (thrown Error instance)')
- [ ] test('saga onError is called for uncaught error (thrown primitive)')
- [ ] test('saga onError is not called for caught errors')

### interpreter/promise.js
- [ ] test('saga native promise handling')
- [ ] test('saga native promise handling: undefined errors')

### sagaHelpers/debounce.js
- [ ] test('debounce: sync actions')
- [ ] test('debounce: async actions')
- [ ] test('debounce: cancelled')
- [ ] test('debounce: channel')
- [ ] test('debounce: channel END')
- [ ] test('debounce: pattern END')
- [ ] test('debounce: pattern END during race')

### sagaHelpers/delay.js
- [ ] test('delay')

### sagaHelpers/retry.js
- [ ] test('retry failing')
- [ ] test('retry without failing')

### sagaHelpers/takeEvery.js
- [ ] test('takeEvery')
- [ ] test('takeEvery: pattern END')

### sagaHelpers/takeLatest.js
- [ ] test('takeLatest')
- [ ] test('takeLatest: pattern END')

### sagaHelpers/takeLeading.js
- [ ] test('takeLeading')
- [ ] test('takeLeading: pattern END')

### sagaHelpers/throttle.js
- [ ] test('throttle')
- [ ] test('throttle: pattern END')

## /packages/testing-utils/__tests__

### cloneableGenerator.js
- [ ] test('it should allow to "clone" the generator')

### createMockTask.js
- [ ] test('should allow to use createMockTask for testing purposes')
