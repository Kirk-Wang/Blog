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
- [ ] test('calling toPromise() of an already cancelled task')
- [ ] test('calling toPromise() of before a task gets cancelled')

### channel.js
- [ ] test('Unbuffered channel')
- [ ] test('buffered channel')
- [ ] test('event channel')
- [ ] test('unsubscribe event channel')
- [ ] test('expanding buffer')

### channel-recipes.js
- [ ] test('action channel')
- [ ] test('error check when constructing actionChannels')
- [ ] test('action channel generator')
- [ ] test('action channel generator with buffers')
- [ ] test('channel: watcher + max workers')

### scheduler.js
- [ ] test('scheduler executes all recursively triggered tasks in order')
- [ ] test('scheduler when suspended queues up and executes all tasks on flush')

### monitoring.js
- [ ] test('saga middleware monitoring')
- [ ] test('runSaga monitoring')
- [ ] test('saga monitors without all functions')

### interpreter/all.js
- [ ] test('saga parallel effects handling')
- [ ] test('saga empty array')
- [ ] test('saga parallel effect: handling errors')
- [ ] test('saga parallel effect: handling END')
- [ ] test('saga parallel effect: named effects')

### interpreter/base.js
- [ ] test('saga iteration')
- [ ] test('saga error handling')
- [ ] test('saga output handling')
- [ ] test('saga yielded falsy values')

### interpreter/call.js
- [ ] test('saga handles call effects and resume with the resolved values')
- [ ] test('saga handles call effects and throw the rejected values inside the generator')
- [ ] test('saga handles call's synchronous failures and throws in the calling generator (1)')
- [ ] test('saga handles call's synchronous failures and throws in the calling generator (2)')
- [ ] test('saga handles call's synchronous failures and throws in the calling generator (2)')

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

### interpreter/context.js
- [ ] test('saga must handle context in dynamic scoping manner')

### interpreter/cps.js
- [ ] test('saga cps call handling')
- [ ] test('saga synchronous cps failures handling')
- [ ] test('saga cps cancellation handling')

### interpreter/effectMiddlewares.js
- [ ] test('effectMiddlewares - single')
- [ ] test('effectMiddlewares - multiple')
- [ ] test('effectMiddlewares - nested task')

### interpreter/flush.js
- [ ] test('saga flush handling')

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

### interpreter/put.js
- [ ] test('saga put handling')
- [ ] test('saga put in a channel')
- [ ] test('saga async put's response handling')
- [ ] test('saga error put's response handling')
- [ ] test('saga error putResolve's response handling')
- [ ] test('saga nested puts handling')
- [ ] test('puts emitted while dispatching saga need not to cause stack overflow')
- [ ] test('puts emitted directly after creating a task (caused by another put) should not be missed by that task')
- [ ] test('END should reach tasks created after it gets dispatched')

### interpreter/race.js
- [ ] test('saga race between effects handling')
- [ ] test('saga race between array of effects handling')
- [ ] test('saga race between effects: handle END')
- [ ] test('saga race between sync effects')
- [ ] test('saga race cancelling joined tasks')

### interpreter/select.js
- [ ] test('saga select/getState handling')

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
