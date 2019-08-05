### React 源码学习

React API 
* createElement
* Ref
* createContext
* Component
* JSX => JS
* Suspense
* ConcurrentMode
* Hooks

React中的更新创建
* ReactDOM.render
* FiberRoot
* Fiber
* Update
* UpdateQueue
* expirationTime

Fiber Scheduler
* scheduleWork
* requestWork
* batchedUpdates
* react scheduler
* performWork
* renderRoot
* performUnitOfWork

开始更新
beginWork以及优化
各类组件的更新过程
调和子节点的过程
*React 当中有十几种不同的组件*

完成各个节点的更新
* completeUnitOfWork 虚拟DOM对比
* completeWork 错误捕获处理
* unwindWork 完成整一棵树更新