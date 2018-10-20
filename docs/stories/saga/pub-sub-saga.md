# 从 Pub/Sub 浅聊 reudx-saga

这篇文章的灵感来自于 [浅析redux-saga实现原理](https://zhuanlan.zhihu.com/p/30098155)。
我想应该可以聊的更浅显一点^_^：

从一个简单的 `saga` 函数（它其实就是一个 `Generator` 函数）说起：

```js
const saga = function* () {
  const action = yield take();
  console.log(action);
}
```

这个函数很简单，当我们执行到 `yield take()` 时候，**控制权**交给了外部的运行函数，并且将 `take()` 的执行结果给返回。

在 `redux-saga` 里面，`take` 是一个 `effect`，也就是说执行 `take()` 返回的是一个纯 `javascript` 对象。

在这里我们简单理解它是长成这个样子的：

```js
const take = () => ({ type: 'TAKE' })
```

外部函数拿到这个对象后，来决定 `saga` 是否继续执行。显然 `redux-saga` 并不立即把控制权给交换回去，让这个 `saga` 继续执行。

而是等待一个 `action` 的触发，同时把这个 `action` 作为 `saga` 里面 `yield take()` 语句的返回。
也就是外部运行函数需要在合适的时机调用这个 `saga` 的 `Iterator.next(action)`。

OK，这显然就是一个（发布/订阅）的关系。

`redux-saga` 用了一个名叫 `channel` 东西来做这件事情。简单的理解里面有一个 `take` 方法做订阅，一个 `put` 方法做发布。
当 `put` 的时候，`take` 方法里面的订阅函数（这里我们叫它 taker）就是执行，并且立即销毁。

那么这个函数的的雏形也就出来了：

```js
function channel() {
  let taker;

  function take(cb) {
    taker = cb;
  }

  function put(input) {
    if (taker) {
      const tempTaker = taker;
      taker = null;
      tempTaker(input);
    }
  }

  return {
    put,
    take,
  };
}

const chan = channel();
```

纽带，我们建完了，我们把事件的订阅者（`saga` 函数）与事件的发布者（`dom` `Button`）捆绑上纽带。

首先是订阅，其实就是运行这个 `saga` 函数，我们简单的把这个函数叫做 `runSaga`（当然，`redux-saga` 里面的这个函数要复杂的多）。

```js
function runSaga(saga) {
  // 拿到迭代器
  const iter = saga();
  // 处理迭代器
  function next(args) {
    const result = iter.next(args);
    if (!result.done) {
      const effect = result.value;
      if (effect.type === 'take') {
          // iter 运行函数 `next` 不在继续执行
          // 订阅注册
          chan.take((input) => {
              next(input)
          })
      }
    }
  }
  next();
}
```

好，接下来绑定发布者：

```js
let i = 0;
$btn.addEventListener('click', () => {
  const action =`action data${i++}`;
  chan.put(action);
}, false);
```

OK，一次点击的监听搞定。

多次就很简单了：

```js
function* saga() {
  while(true) {
    const action = yield take();
    console.log(action);
  }
}
```

可能有的小伙伴很奇怪，为什么一个事件处理要TM搞的如此的麻烦？

我们经常说程序功能的扩展性要强，可伸缩云云~~，就不难理解这样设计的好处了。所有逻辑通用单独维护，用到时纽带一连就好了。

这也就验证了那句话：副作用不是消除，而是优雅的管理。
