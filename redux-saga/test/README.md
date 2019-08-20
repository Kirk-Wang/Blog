Redux-Saga 测试用例阅读计划：

**目标：熟悉 Redux-Saga 所有用法**

## /packages/core/__tests__
阅读顺序不分先后

### runSaga.js
- [ ] test('runSaga')

### middleware.js
- [ ] test('middleware output')
- [ ] test('middleware's action handler output')
- [ ] test('middleware.run')
- [ ] test('middleware options')
- [ ] test('enhance channel.put with an emitter')
- [ ] test('middleware.run saga arguments validation')

### taskToPromise.js
- [ ] test('calling toPromise() of an already completed task')
- [ ] test('calling toPromise() before a task completes')
- [ ] test('calling toPromise() of an already aborted task')
- [ ] test('calling toPromise() before a task aborts')
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
