### React 应用中的模式和原则

#### React 的基本思想

1. 在 React 中，界面完全由数据驱动；
2. 在 React 中，一切都是组件；
3. props 是 React 组件之间通讯的基本方式。

### 读 React 16.x 源码

[React 源码解析](https://react.jokcy.me/)

#### JSX到JavaScript的转换

[Babel-REPL](https://babeljs.io/repl)，在线互转

#### ReactElement

ReactElement.js

先记住这个对象：

![element](./docs/images/react/element.png)

#### ReactComponent

ReactBaseClasses.js

只是对组件进行了通用定义，平台无关。

[Componet](https://reactjs.org/docs/react-component.html)

#### ReactRef

ReactCreateRef.js

createRef & ref

三种方式：string & function & object

核心：更新到结束

#### forwardRef

forwardRef.js

```jsx
React.forwardRef((props, ref)=>(<div ref={ref}></div>))
```
场景：HOC & functional Component

#### context 

ReactContext.js

Context的两种方式：childContextType(快被废弃) & createContext

#### ConcurrentMode

渲染优先级

flushSync

#### Suspense & Lazy

#### hooks

funciton Component & useState & useEffects ...

应该是 redux 作者 Dan 亲自操刀写的

#### children

React.js & ReactChildren.js

```jsx
React.Children = { map, forEach, count, toArray, only }
// React.Children.map 功能强大，会展开嵌套的数组
```

#### others

MEMO & PureComponent

<> & React.Fragment

cloneElement

createFactory

...


#### 创建更新的方式
* ReactDOM.render || hydrate
* setState
* forceUpdate
* 步骤
  * 创建 ReactRoot
  * 创建 FiberRoot 和 RootFiber
  * 创建更新
-----