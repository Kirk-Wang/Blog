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