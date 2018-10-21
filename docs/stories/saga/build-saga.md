# 构建你自己的 redux-saga 总结

1. `effect`：只要是被 `yield` 的值，都可以被称为 `effect`。
2. `effect-producer`：我们的业务代码。
3. `effect-runner`：`saga-middleware`。
4. `saga` 函数：就是指 `JavaScript` 生成器函数。
5. `saga` 实例：指的是调用 `saga` 函数得到的迭代器对象。
6. `task`：指的是 saga 实例运行状态的描述对象。
7. 迭代器对象包含了三个方法：`next`/`throw`/`return`。
8. `for-of`：只会不断调用迭代器对象 `next` 方法，但不会传参。
9. `while-true` 消费迭代器：手动调用 next/throw/return 方法，那么我们可以实现更多的功能。缺陷：`while-true` 是同步的。
10. 递归消费迭代器：最终的 `effect-runner`。
11. 单项通信：`effect-runner` 调用 `iterator.next()` 获取 effect。但`effect-runner` 没有将数据传递给 `effect-producer`。
12. 双向通信：`effect-runner` 要提供合适的参数来调用 `iterator.next(arg)` 。参数 `arg` 将会作为 `effect-producer` 中 `yield xxx` 语句的返回值并继续执行直到一个 `yield`。
13. `effect`类型：`promise`、`iterator`、`take`、`put` 等。
14. [co](https://github.com/tj/co)。
15. `result-first callback style`
```typescript
type Callback = (result: any, isErr: boolean) => void
/**
redux-saga 源码中几乎所有回调函数都是该风格的，相应的变量名也有好几个：
cont continuation 缩写，一般用于表示 Task / MainTask / ForkQueue 的后继
cb callback 缩写 或是 **currCb** 应该是 currentCallback 的缩写。一般用于 effect 的后继/回调函数
next 就是前边的递归函数，它也是符合 result-first callback style 的
**/
```
16. `cancellation`：[任务取消](https://redux-saga.js.org/docs/advanced/TaskCancellation.html)。
17. [如何取消你的 Promise？](https://juejin.im/post/5a32705a6fb9a045117127fa)。
18. `effect` 状态：运行中、已完成（正常结束或是抛出错误结束都算完成）、被取消。
19. `little-saga` 有更新，待我啃一下源码……。