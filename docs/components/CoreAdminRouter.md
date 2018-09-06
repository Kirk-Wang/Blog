### CoreAdminRouter 组件源码分析

首先来看看它在 CoreAdmin 是如何被调用的：

```js
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
```

发现它是被包在 Route 组件的 render 属性中的一个函数里面。使用 render 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

下面是 Route 组件的 render 函数，[code](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js#L111)：
```js
render() {
    const { match } = this.state;
    const { children, component, render } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { match, location, history, staticContext };
    if (component) return match ? React.createElement(component, props) : null;
    // CoreAdminRouter采用的就是这种方式的渲染
    if (render) return match ? render(props) : null;
    if (typeof children === "function") return children(props);
    if (children && !isEmptyChildren(children))
      return React.Children.only(children);
    return null;
}
```

#### CoreAdminRouter 被传进来了如下属性：

![](../images/CoreAdminRouter-Props.png)

### 从测试用例说起，我们看看它主要干了什么？

```jsx
describe('<AdminRouter>', () => {
    const defaultProps = {
        authProvider: () => Promise.resolve(),
        customRoutes: [],
    };
    describe('With resources as regular children', () => {
        it('should render all resources with a registration context', () => {
            const wrapper = shallow(
                <CoreAdminRouter {...defaultProps}>
                    <Resource name="posts" />
                    <Resource name="comments" />
                </CoreAdminRouter>
            );

            const resources = wrapper.find('Connect(Resource)');
    
            assert.equal(resources.length, 2);
            assert.deepEqual(
                resources.map(resource => resource.prop('context')),
                ['registration', 'registration']
            );
        });
    });
});
```

上面测试用例，使用 Resource 组件作为常规的子级。是否应该渲染具有 registration context 的所有 Resource 组件。

这里，看一段 CoreAdminRouter 的源码，就很清晰了：

```jsx
{// Render every resources children outside the React Router Switch
    // as we need all of them and not just the one rendered
    Children.map(childrenToRender, child =>
        cloneElement(child, {
            key: child.props.name,
            // The context prop instructs the Resource component to not render anything
            // but simply to register itself as a known resource
            context: 'registration',
        })
)}
```