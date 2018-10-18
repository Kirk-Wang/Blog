# React-Admin-App

## 文档

[官方文档](https://marmelab.com/react-admin/) | [中文文档](https://www.react-admin.com)

## 核心组件及源码分析

### [调试 React-Admin 源码，看清框架的本质](./docs/stories/debug-react-admin.md)

### 基于 Redux Devtools 来逐步分析 React-Admin（最新）

这是一个 `Redux` 应用程序，从 `Devtools` 去看它做了哪些事儿，应该是一个不错的选择。

项目，采用官方自带的示例，`example` 目录下的 `simple` 项目。怎么跑起来？[调试 React-Admin 源码，看清框架的本质](./docs/stories/debug-react-admin.md)

扩展安装：[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

1. [`localhost:8080` 背后的动作](./docs/stories/redux-devtools/npm-start.md)
2. [`localhost:8080/#/login` 背后的动作](./docs/stories/redux-devtools/route-login.md)

### redux-saga

预备知识：

[Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)

[深入浅出 ES6（二）：迭代器和 for-of 循环](http://www.infoq.com/cn/articles/es6-in-depth-iterators-and-the-for-of-loop)

[深入浅出 ES6（三）：生成器 Generators](http://www.infoq.com/cn/articles/es6-in-depth-generators)

**[官方文档](https://redux-saga-in-chinese.js.org/)扫盲**：

1. `Effects` 是一些简单 `Javascript` 对象，包含了要被 `middleware` 执行的指令。
2. `middleware` 检查每个被 `yield` 的 `Effect` 的类型，然后决定如何实现哪个 `Effect`。
3. 记住这是一个 `Generator` 函数，它不具备 从运行至完成 的行为（`run-to-completion behavior`）

相关好文：

[redux-saga 实践总结](https://zhuanlan.zhihu.com/p/23012870)

[浅析redux-saga实现原理](https://zhuanlan.zhihu.com/p/30098155)，关于[小鹿](https://zhuanlan.zhihu.com/p/30098155)这篇我总结一下：

从一个简单的 `saga` 函数（它其实就是一个 `Generator` 函数）说起：

```js
function* saga() {
    const action = yield take();
    console.log(action);
}
```

这个函数很简单，当我们执行到 `yield take()` 时候，控制权交给了外部的运行函数，并且将 `take()` 的执行结果给返回。

在 `redux-saga` 里面，`take` 是一个 `effect`，也就是说执行 `take()` 返回的是一个纯 `javascript` 对象。

在这里我们简单理解它是长成这个样子的：

```js
function take() {
  return {
    type: 'take'
  };
}
```

外部函数拿到这个对象后，来决定 `saga` 是否继续执行。显然 `redux-saga` 并不立即把控制权给交换回去，让这个 `saga` 继续执行。

而是等待一个 `action` 的触发，同时把这个 `action` 作为 `saga` 里面 `yield take()` 语句的返回。
也就是外部 `saga` 运行函数需要在合适的时机调用这个 `saga` 的 `Iterator.next(action)`。

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




[Redux-Saga 漫谈](https://www.yuque.com/lovesueee/blog/redux-saga)

### 脑子里必须清楚的 `redux` `redux-saga` 使用流程。（脑回路一下……）

### 生啃 `redux-saga` 源码：

操练地址：

### 肥超大佬的 [little-saga](https://github.com/little-saga/little-saga)

接下来 `All In Saga`：

**[构建你自己的 redux-saga](https://github.com/little-saga/little-saga/blob/master/docs/building-your-own-redux-saga.md)** 一文总结：

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

**[坦克大战复刻版](https://zhuanlan.zhihu.com/p/35551654)** 阅读：

### 工程化

### Mac开发配置

### FAQ
[ImageInput 相关问题](https://github.com/Kirk-Wang/react-admin-app/issues/1)

### 用好 `React-Admin`，其实就是用好它暴露出来的 `Admin` 组件。它的实现可以说就是整个 `react-admin` 项目架构的实现。接下来会逐一讲解它的每一个属性，以及 `Admin` 组件用它们做了什么❓
* [React-Admin 架构分析：`Admin` 组件源码解析之 `dataProvider` 属性](./docs/stories/core-admin-data-provider.md)
* [React-Admin 架构分析：Material-UI 定制](./docs/stories/material-ui-customization.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Themes` 文档](./docs/stories/material-ui-customization-themes.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Overrides` 文档](./docs/stories/material-ui-customization-overrides.md)
    * [React-Admin 架构分析：Material-UI 定制之 `CSS in JS` 文档](./docs/stories/material-ui-customization-css-in-js.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Default Theme` 文档](./docs/stories/material-ui-customization-default-theme.md)
* [React-Admin 架构分析：`Admin` 组件源码解析之 `theme` 属性](./docs/stories/core-admin-app-theme.md)
* [React-Admin 架构分析：`Admin` 组件源码解析之 `appLayout` 属性](./docs/stories/core-admin-app-layout.md)

### `react-admin` 各 `package` 分析 (文章曲线不对，废弃)

* [react-admin 包分析](./docs/stories/react-admin-package.md)
* [ra-core 包分析](./docs/stories/ra-core-package.md)

### [Admin 组件源码解析](./docs/stories/Admin.md)（有干货但有些凌乱，留作纪念）
### [CoreAdminRouter 组件源码分析](./docs/stories/CoreAdminRouter.md)（有干货但有些凌乱，留作纪念）

## 小插曲

### [CSSINJS](http://cssinjs.org)

传统的“关注点分离”（separation of concerns）原则中不推荐我们把 HTML、CSS、JS 混杂一起编写，但是在伴随着前端组件模式的大潮"关注点混合"慢慢成为主流。

[漫谈 CSS in JS](https://zhuanlan.zhihu.com/p/31622439)

### 读 NervJS 源码

先刷一篇官方使用文档，然后总结一下……

## 使用 React-Admin 实战中后台应用

[最早的想法（留作纪念）](./docs/stories/old-readme.md)

## 优秀的 blog

[Jony的博客，记录学习工作的点点滴滴](https://github.com/forthealllight/blog)
[冴羽的博客](https://github.com/mqyqingfeng/Blog)
[node-interview](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)