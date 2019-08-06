### React 源码学习

🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻

[React 源码解析](https://react.jokcy.me/)
* 足够的耐心
* 思考再思考

#### 通读源码不是目的
* 外在
  * 提高开发能力
  * 解决问题能力
  * 提升自身价值
* 内在
  * 提升学习能力
  * 提升思考能力
  * 提升设计能力

#### React API 
* createElement
* Ref
* createContext
* Component
* JSX => JS
* Suspense
* ConcurrentMode
* Hooks

#### React中的更新创建
* ReactDOM.render
* FiberRoot
* Fiber
* Update
* UpdateQueue
* expirationTime

#### Fiber Scheduler
* scheduleWork
* requestWork
* batchedUpdates
* react scheduler
* performWork
* renderRoot
* performUnitOfWork

#### 开始更新
beginWork以及优化
各类组件的更新过程
调和子节点的过程
*React 当中有十几种不同的组件*

#### 完成各个节点的更新
* completeUnitOfWork 虚拟DOM对比
* completeWork 错误捕获处理
* unwindWork 完成整一棵树更新

#### 提交更新
* commitRoot整体流程   开发时的帮助方法
* 提交快照             提交DOM插入
* 提交DOM更新          提交DOM删除
* 提交所有声明周期

#### 各种功能的实现过程
* context的实现过程
* ref的实现过程
* hydrate的实现过程
* React的事件体系

#### Suspense
* 更新优先级的概念      更新挂起的概念
* Suspense组件更新     timeout处理
* retry重新尝试渲染    lazy组件更新

#### Hooks
* 核心原理        useState
* useEffect      useContext
* 其他Hooks API

Fiber、Update、Scheduler 核心

### JSX 到 JavaScript 的转换

[REPL](https://babeljs.io/repl)

**规范：自定义定义组件要大写**

### ReactElement

**ReactElement.js**

![React-Element](./images/react-element.png)

手册：[ReactElement](https://react.jokcy.me/book/api/react-element.html)

### React Component

**React Base Classes**