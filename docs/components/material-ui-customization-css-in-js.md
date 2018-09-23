# React-Admin 架构分析：Material-UI 定制 `CSS in JS` 详解

<p class="description">即使您不使用我们的组件，您也可以利用我们的样式解决方案。</p>

Material-UI 旨在为构建动态 UI 提供坚实的基础。
为简单起见，**我们向用户导出我们的样式解决方案**。
你可以使用它，但你不必这样做。该样式解决方案可与所有其他主要解决方案[共同使用](https://material-ui.com/guides/interoperability)。

## Material-UI 的样式解决方案
在以前的版本中，Material-UI 使用了 LESS，然后使用自定义内联式解决方案来编写组件的样式，但这些方法已被证明是有局限的。最近，我们转向了 *CSS-in-JS* 解决方案。它解锁了许多强大的功能（theme nesting，dynamic styles，self-support 等）。我们认为这是未来：
- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [基于组件的样式的未来](https://medium.freecodecamp.org/css-in-javascript-the-future-of-component-based-styling-70b161a79a32)
- [将SCSS（Sass）转换为CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

所以，你可能已经在 demo 中注意到了 *CSS-in-JS* 的样子。
我们使用 [`withStyles`](https://material-ui.com/customization/css-in-js/#api) 创建的高阶组件，使用 JSS 将一组样式作为 CSS 注入到 DOM 中。
这是一个例子：

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rwlz3ol99p)

## JSS

Material-UI 的样式解决方案以 [JSS](https://github.com/cssinjs/jss) 为核心。
它是一个 [高性能](https://github.com/cssinjs/jss/blob/master/docs/performance.md) 的JS to CSS编译器，可在服务器端运行。
它大约是8 kB（压缩和gzip压缩），并且可以通过 [plugins](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API进行扩展。

如果您最终在代码库中使用此样式解决方案，则需要 *学习API*。

最好的开始是查看每个 [插件](http://cssinjs.org/plugins/) 提供的功能。 Material-UI 使用的[很少](https://material-ui.com/customization/css-in-js/#plugins)。 如果需要，您可以随时使用 [`JssProvider`](https://github.com/cssinjs/react-jss#custom-setup) 助手添加新插件。

如果您希望构建自己的 `jss` 实例 **并** 支持 *rtl* ，请确保您还包含 [jss-rtl](https://github.com/alitaheri/jss-rtl) 插件。 查看 jss-rtl [自述文件](https://github.com/alitaheri/jss-rtl#simple-usage) 以了解具体方法。

## Sheets 注册

在服务器上渲染时，您需要将所有渲染样式作为 CSS 字符串。
`SheetsRegistry` 类允许您手动聚合和 stringify 它们。
阅读有关[服务器渲染](https://material-ui.com/guides/server-rendering)的更多信息。

[demo](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/customization/css-in-js/JssRegistry.js)

## Sheets 管理器

Sheets 管理器使用[引用计数算法]((https://en.wikipedia.org/wiki/Reference_counting))，以便每对（样式，主题）只附加和分离样式表一次。在重新渲染组件的实例时，此技术可提供重要的性能提升。

当只在客户端上呈现时，这不是您需要注意的事情。但是，在服务器上进行渲染时。 您可以阅读有关[服务器渲染](https://material-ui.com/guides/server-rendering)的更多信息。

## 类名

您可能已经注意到，我们的样式解决方案生成的类名是 **非确定性的**，所以你不能指望他们保持不变。以下CSS不会工作:
```css
.MuiAppBar-root-12 {
  opacity: 0.6
}
```

相反，您必须使用组件的 `classes` 属性来覆盖它们。
另一方面，由于类名的不确定性，我们可以为开发和生产实现优化。
它们在开发中很容易调试，在生产中尽可能短:

- development: `.MuiAppBar-root-12`
- production: `.jss12`

如果您不喜欢这种默认行为，您可以更改它。JSS依赖于[类名生成器](http://cssinjs.org/js-api/#generate-your-own-class-names)的概念

### 全局 CSS

我们为Material-UI需求提供了类名生成器的定制实现:
[`createGenerateClassName()`](https://material-ui.com/customization/css-in-js/#creategenerateclassname-options-class-name-generator)。
以及使用 `dangerouslyUseGlobalCSS` 来使类名 **确定性** 的选项。打开时，类名将如下所示：

- development: `.MuiAppBar-root`
- production: `.MuiAppBar-root`

⚠️ **使用`dangerous ouslyuseglobalcss`时要小心**
我们提供这个选项作为快速原型设计的逃生舱口。
在生产环境中运行的代码依赖于它有以下含义:
- 全局CSS本质上是脆弱的。人们使用像[BEM](http://getbem.com/guidetion/)这样的严格方法来解决这个问题。
- 很难跟踪 `classes` API 的变化。

⚠️ 在单独使用 `dangerouslyUseGlobalCSS` (不包含Material-UI)时，您应该将样式表命名。`withStyles` 有一个 name 的选项:
```jsx
const Button = withStyles(styles, { name: 'button' })(ButtonBase)
```

## CSS 注入顺序

由 Material-UI 注入的 CSS 组件样式具有最高的优先级，它作为 `<link>` 被注入到 `<head>` 的底部来确保组件总是正确呈现。

但是，您可能还想重写这些样式，例如使用 styled-components。如果您遇到 CSS 注入顺序问题，JSS 提供了处理这种情况的[机制](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-dom-insertion-point)。
通过调整 HTML head 中的 `insertionPoint` 的位置，可以[控制将 CSS 规则](http://cssinjs.org/js-api/#attach-style-sheets-in-a-specific-order)应用到组件的顺序。

### HTML 注释

最简单的方法是添加一个 HTML 注释，确定 JSS 将注入样式的位置：

```jsx
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // 我们定义了一个自定义插入点，JSS将寻找，并在DOM中注入样式。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### 其他 HTML 元素

[Create React App](https://github.com/facebook/create-react-app) 在创建生产版本时删除HTML注释。
要解决此问题，您可以提供 DOM 元素（注释除外）作为 JSS 插入点。

例如，`<noscript>` 元素：

```jsx
<head>
  <noscript id="jss-insertion-point"></noscript>
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // 我们定义一个自定义插入点，JSS将寻找并在DOM中注入样式。
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### JS createComment

codesandbox.io 阻止访问 `<head>` 元素。
要解决这个问题，您可以使用 JavaScript `document.createComment()` API：

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
   // 我们定义一个自定义插入点，JSS将寻找并在DOM中注入样式。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## JssProvider

react-jss 公开了一个 `JssProvider` 组件，为底层子组件配置 JSS。
有不同的用例：
- 提供类名生成器。
- [提供一个 Sheets registry](https://material-ui.com/customization/css-in-js#sheets-registry)
- Providing a JSS instance. You might want to support [Right-to-left](/guides/right-to-left) or changing the [CSS injection order](/customization/css-in-js#css-injection-order).
- 提供一个JSS实例。 您可能希望支持[从右到左](https://material-ui.com/guides/right-to-left)或更改 [CSS 注入顺序](https://material-ui.com/customization/css-in-js#css-injection-order)。
阅读[JSS文档](http://cssinjs.org/js-api/)以了解更多可用选项。下面是一个例子:

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## 插件

JSS 使用插件的概念来扩展它的核心，允许人们挑选他们需要的特性。
您只需为所使用的内容支付性能开销。
由于 `withStyles` 是我们的内部样式解决方案，所有的插件在默认情况下都不可用。我们增加了以下清单:
- [jss-global](http://cssinjs.org/jss-global/)
- [jss-nested](http://cssinjs.org/jss-nested/)
- [jss-camel-case](http://cssinjs.org/jss-camel-case/)
- [jss-default-unit](http://cssinjs.org/jss-default-unit/)
- [jss-vendor-prefixer](http://cssinjs.org/jss-vendor-prefixer/)
- [jss-props-sort](http://cssinjs.org/jss-props-sort/)

它是 [jss-preset-default](http://cssinjs.org/jss-preset-default/) 的一个子集。当然，您可以随意添加一个新插件。我们有一个 [jss-rtl插件](https://material-ui.com/guides/right-to-left#3-jss-rtl) 的例子。

## API

### `withStyles(styles, [options]) => higher-order component`

用一个组件链接一个样式表
它不修改传递给它的组件；相反，它返回一个带有 `classes` 属性的新组件。
这个 `classes` 对象包含注入进 DOM 的类名的名称。

一些可能有趣的实现细节：
- 它添加了一个 `classes` 属性，因此您可以从外部覆盖注入的类名。
- 它添加了一个 `innerRef` 属性，因此您可以获得对包装组件的引用。`innerRef` 的用法与`ref` 相同。
- 它转发 *非React静态* 属性，因此这个HOC更 “透明”。
例如，它可以用于定义 `getInitialProps()` 静态方法（next.js）。

#### 参数

1. `styles` (*Function | Object*): 一个产生样式的函数或着一个样式对象。它将链接到组件。如果您需要访问主题，请使用函数签名。 它是作为第一个参数提供的。
2. `options` (*Object* [optional]):
  - `options.withTheme` (*Boolean* [optional]): 默认为“false”。将 `theme` 对象作为属性提供给组件。
  - `options.name` (*String* [optional]): 样式表的名称。用于调试。
    如果未提供该值，它将尝试回退到组件的名称。
  - `options.flip` (*Boolean* [optional]): 设置为 `false` 时，此样式表将选择退出 `rtl` 转换。设置为 `true` 时，样式将反转。当设置为 `null` 时，它遵循 `theme.direction` 。
  - 其他键被转发到 [jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet) 的 options 参数。

#### 返回

`higher-order component`: 应该用来包装一个组件。

#### 示例

```jsx
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

此外，您可以使用像这样的[装饰器](https://babeljs.io/docs/plugins/transform-decorators/)：

```jsx
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent
```

### `createGenerateClassName([options]) => class name generator`

一个返回[类名生成器函数](http://cssinjs.org/js-api#generate-your-own-class-names)的函数。

#### 参数

1. `options` (*Object* [optional]):
  - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): 默认为 `false` 。 使 Material-UI class 名称具有确定性。
  - `options.productionPrefix` (*String* [optional]): 默认为 `"jss"`。 用于在生产中为类名添加前缀的字符串。
  - `options.seed` (*String* [optional]): 默认为`''`。用于唯一标识生成器的字符串。当使用多个生成器时，它可用于避免类名冲突。

#### Returns

`class name generator`: 应该向 JSS 提供的生成器。

#### Examples

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

function App() {
  return (
    <JssProvider generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## Alternative APIs

你认为[高阶组件是新的 mixins](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)吗？请放心，我们不会这样做，但是因为 `withStyles()` 是一个更高阶的组件，所以只需几行代码就可以扩展它，以匹配所有惯用的 React 模式。这里有几个例子。

### Render props API (+11 lines)

The term [“render prop”](https://reactjs.org/docs/render-props.html) refers to a simple technique for sharing code between React components using a prop whose value is a function.
术语 [“render prop”](https://reactjs.org/docs/render-props.html) 指的是使用其值为函数的属性，在React组件之间共享代码的简单技术。

```jsx
// 您将在 demo 中找到 `createStyled` 实现。
const Styled = createStyled({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

function RenderProps() {
  return (
    <Styled>
      {({ classes }) => (
        <Button className={classes.root}>
          {'Render props'}
        </Button>
      )}
    </Styled>
  );
}
```

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qq0rp0p5w4)

你可以用与 `withStyles` 同样的方式访问 theme:
```js
const Styled = createStyled(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
```

[@jedwards1211](https://github.com/jedwards1211) 花时间将这个模块移动到一个包中：[material-ui-render-props-styles](https://github.com/jcoreio/material-ui-render-props-styles)。以便随意使用它。

### styled-components API (+15 lines)

styled-components 的 API 删除了组件和样式之间的映射。使用组件作为 low-level styling construct 可以更简单。

```jsx
// 您将在 demo 中找到 `styled` 实现。
// 您甚至可以使用 https://github.com/cssinjs/jss-template 编写 CSS。
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}
```

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zr9lmy7z8l)

您可以像使用 `withStyles` 一样访问 theme：
```js
const MyButton = styled(Button)(theme => ({
  backgroundColor: theme.palette.background.paper,
}));
```
