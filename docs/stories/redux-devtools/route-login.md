# `localhost:8080/#/login` 背后的动作

1. UI：

![](./images/npm-start/3.png)

2. devtools：

![](./images/route-login/1.png)

3. 所触发的动作：

![](./images/route-login/2.png)

**`@@INIT`**

这个是当你 `createStore` 的时候，`redux` 内部的一次 `dispatch`

```js
 dispatch({ type: ActionTypes.INIT })
```

**RA/RESET_FORM，@@redux-form/DESTROY, @@router/LOCATION_CHANGE**

为什么要在路由改变的时候分发 `RA/RESET_FORM，@@redux-form/DESTROY`？

原因是避免 `redux-form` 不必要的表单数据 state 的混乱。它处理已经作为 `redux` 中间件（`formMiddleware`）进行了封装。所以每次路由（`@@router/LOCATION_CHANGE` 被 `dispatch`）改变的时候都会做这件事儿。