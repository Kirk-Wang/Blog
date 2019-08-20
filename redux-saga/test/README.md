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
