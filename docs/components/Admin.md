### Admin 组件源码分析
```jsx
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import withContext from 'recompose/withContext';

import { USER_LOGOUT } from './actions/authActions';

import createAppReducer from './reducer';
import { adminSaga } from './sideEffect';
import { TranslationProvider, defaultI18nProvider } from './i18n';
import CoreAdminRouter from './CoreAdminRouter';

const CoreAdmin = ({
    appLayout,
    authProvider,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes = [],
    dashboard,
    history,
    menu, // deprecated, use a custom layout instead
    catchAll,
    dataProvider,
    i18nProvider = defaultI18nProvider,
    theme,
    title = 'React Admin',
    loading,
    loginPage,
    logoutButton,
    initialState,
    locale = 'en',
}) => {
    const messages = i18nProvider(locale);
    const appReducer = createAppReducer(customReducers, locale, messages);

    const resettableAppReducer = (state, action) =>
        appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider, i18nProvider),
                ...customSagas,
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();
    const routerHistory = history || createHistory();
    const store = createStore(
        resettableAppReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware, routerMiddleware(routerHistory)),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
        )
    );
    sagaMiddleware.run(saga);

    const logout = authProvider ? createElement(logoutButton) : null;

    return (
        <Provider store={store}>
            <TranslationProvider>
                <ConnectedRouter history={routerHistory}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                createElement(loginPage, {
                                    ...props,
                                    title,
                                })
                            }
                        />
                        <Route
                            path="/"
                            render={props => (
                                <CoreAdminRouter
                                    appLayout={appLayout}
                                    catchAll={catchAll}
                                    customRoutes={customRoutes}
                                    dashboard={dashboard}
                                    loading={loading}
                                    loginPage={loginPage}
                                    logout={logout}
                                    menu={menu}
                                    theme={theme}
                                    title={title}
                                    {...props}
                                >
                                    {children}
                                </CoreAdminRouter>
                            )}
                        />
                    </Switch>
                </ConnectedRouter>
            </TranslationProvider>
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

CoreAdmin.propTypes = {
    appLayout: componentPropType,
    authProvider: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    catchAll: componentPropType,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    dataProvider: PropTypes.func.isRequired,
    history: PropTypes.object,
    i18nProvider: PropTypes.func,
    initialState: PropTypes.object,
    loading: componentPropType,
    locale: PropTypes.string,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    theme: PropTypes.object,
    title: PropTypes.node,
};

export default withContext(
    {
        authProvider: PropTypes.func,
    },
    ({ authProvider }) => ({ authProvider })
)(CoreAdmin);
```

通过上面代码，我们知道这是一个函数式组件（Functional Components) ，他接受如下属性：
```jsx
const CoreAdmin = ({
    // 自定义布局
    appLayout,
    // 自定义身份验证策略
    authProvider,
    // 子组件
    children,
    // 自定义 Redux Reducer
    customReducers = {},
    // 自定义 Redux Saga
    customSagas = [],
    // 自定义路由
    customRoutes = [],
    // 仪表盘
    dashboard,
    // 历史记录
    history,
    // 目前已废弃，自定义菜单
    menu, // deprecated, use a custom layout instead
    // 可以用来自定义 Not Found
    catchAll,
    // 唯一必需的属性，它必须是一个返回一个promise的函数
    dataProvider,
    // 国际化，用来做多语言切换
    i18nProvider = defaultI18nProvider,
    // 自定义主题
    theme,
    // 自定义标题，默认是 React Admin
    title = 'React Admin',
    // 资源加载 loading
    loading,
    // 登录页
    loginPage,
    // 注销按钮
    logoutButton,
    // 初始 Redux State
    initialState,
    // 本地化，默认是英文
    locale = 'en',
}) => {
    ...
}
```

![](../images/CoreAdmin.png)

相关文档，可以查看 [Admin](https://marmelab.com/react-admin/Admin.html)

### 本地化处理
```js
const messages = i18nProvider(locale);
```
1. 分析下这个默认的 i18nProvider(defaultI18nProvider)：
```js
import defaultMessages from 'ra-language-english';

export default () => defaultMessages;
```
我们发现它是直接返回一个箭头函数，调用函数直接返回 react-admin 所支持的英文语言包 [ra-language-english](https://github.com/marmelab/react-admin/tree/master/packages/ra-language-english)。具体内容大家自行点开查看。

### 创建 App Reducer
```js
const appReducer = createAppReducer(customReducers, locale, messages);
```
它是一个如下函数：
```js
export default (customReducers, locale, messages) =>
    combineReducers({
        admin,
        i18n: i18nReducer(locale, messages),
        form: formReducer,
        routing: routerReducer,
        ...customReducers,
    });
```

![](../images/appReducer.png)

在这里，我们首先来聊一下这个 combineReducers。它是由 Redux 提供的一个辅助函数。作用是把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。看一个 Redux 官方的测试用例，来秒懂一下：
```js
 it('returns a composite reducer that maps the state keys to given reducers', () => {
      const reducer = combineReducers({
        counter: (state = 0, action) =>
          action.type === 'increment' ? state + 1 : state,
        stack: (state = [], action) =>
          action.type === 'push' ? [...state, action.value] : state
      })

      const s1 = reducer({}, { type: 'increment' })
      expect(s1).toEqual({ counter: 1, stack: [] })
      const s2 = reducer(s1, { type: 'push', value: 'a' })
      expect(s2).toEqual({ counter: 1, stack: ['a'] })
    })
/**
 * 通俗点说，就是有一堆这样的函数 --> (state, action) => nextState
 * 把它们合并起来变成一个具有它们所有改变 state 能力的函数 --> (state, action) => nextState
 */
```
执行 reducer({}, { type: 'increment' })，实际上就是执行[这段代码](https://github.com/reduxjs/redux/blob/e63c36a4185d1a31d8b7abcba974016fc984b306/src/combineReducers.js#L145)：
```jsx
    // 一眼看出它是一个标准的 Redux Reducer ---> (state, action) => nextState
    return function combination(state = {}, action) {
        // ....省略一些错误处理代码

        // 状态有无改变标志位
        let hasChanged = false
        // 创建一个空的 state, 如果 hasChanged 为真，则返回它
        const nextState = {}
        // 遍历合并过的 reducer
        for (let i = 0; i < finalReducerKeys.length; i++) {
            // 拿到 reducer key
            const key = finalReducerKeys[i]
            // 得到这个 key 所对应的 reducer，key 与实际 reducer 的函数名不一定相同
            const reducer = finalReducers[key]
            // 得到这个 key 所对应的当前 state
            const previousStateForKey = state[key]
            // 通过 reducer 处理，得到当前 key 的下一次 state
            const nextStateForKey = reducer(previousStateForKey, action)
            // 错误处理
            if (typeof nextStateForKey === 'undefined') {
                const errorMessage = getUndefinedStateErrorMessage(key, action)
                throw new Error(errorMessage)
            }
            // 给当前 key 赋值 state
            nextState[key] = nextStateForKey
            // 判断是否有 reducer 改变了 state
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        // 有改变 state, 返回 nextState，没有就返回 state
        return hasChanged ? nextState : state
    }
```