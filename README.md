# React-Admin-App

## 文档

[官方文档](https://marmelab.com/react-admin/) | [中文文档](https://www.react-admin.com)

## 核心组件及源码分析

### [调试 React-Admin 源码，看清框架的本质](./docs/stories/debug-react-admin.md)

### 基于 Redux Devtools 来逐步分析 React-Admin（最新）

这是一个 `Redux` 应用程序，从 `Devtools` 去看它做了哪些事儿，应该是一个不错的选择。

项目，采用官方自带的示例，`example` 目录下的 `simple` 项目。怎么跑起来？[调试 React-Admin 源码，看清框架的本质](./docs/stories/debug-react-admin.md)

扩展安装：[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

1. [从 `npm start` 启动项目开始说起](./docs/stories/redux-devtools/npm-start.md)

### redux-saga

基础知识：

[Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)
[深入浅出 ES6（二）：迭代器和 for-of 循环](http://www.infoq.com/cn/articles/es6-in-depth-iterators-and-the-for-of-loop)
[深入浅出 ES6（三）：生成器 Generators](http://www.infoq.com/cn/articles/es6-in-depth-generators)

相关好文：

[redux-saga 实践总结](https://zhuanlan.zhihu.com/p/23012870)

[浅析redux-saga实现原理](https://zhuanlan.zhihu.com/p/30098155)

[Redux-Saga 漫谈](https://www.yuque.com/lovesueee/blog/redux-saga)

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
```

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