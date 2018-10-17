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

**@@redux-form/UPDATE_SYNC_ERRORS**

这个是我们，在登录页面，用 `reduxForm` 高阶组件初始化表单时候，因为我们传入了 `validate` 函数，所以它会在内部分发一次。

```js
reduxForm({
    form: 'signIn',
    validate: (values, props) => {
        const errors = {};
        const { translate } = props;
        if (!values.username)
            errors.username = translate('ra.validation.required');
        if (!values.password)
            errors.password = translate('ra.validation.required');
        return errors;
    },
})
```

**@@redux-form/REGISTER_FIELD(2)**

同样，`redux-form` 对 `signIn` 的表单字段的注册。

**@@redux-form/UPDATE_SYNC_ERRORS**

注册完后，同步一下。