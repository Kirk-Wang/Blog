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

### HTML comment

The simplest approach is to add an HTML comment that determines where JSS will inject the styles:

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
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
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

### Other HTML element

[Create React App](https://github.com/facebook/create-react-app) strips HTML comments when creating the production build.
To get around the issue, you can provide a DOM element (other than a comment) as the JSS insertion point.

For example, a `<noscript>` element:

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
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
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

codesandbox.io prevents the access to the `<head>` element.
To get around the issue, you can use the JavaScript `document.createComment()` API:

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
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

react-jss exposes a `JssProvider` component to configure JSS for the underlying child components.
There are different use cases:
- Providing a class name generator.
- [Providing a Sheets registry.](/customization/css-in-js#sheets-registry)
- Providing a JSS instance. You might want to support [Right-to-left](/guides/right-to-left) or changing the [CSS injection order](/customization/css-in-js#css-injection-order).
Read [the JSS documentation](http://cssinjs.org/js-api/) to learn more about the options available.
Here is an example:

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

## Plugins

JSS uses the concept of plugins to extend its core, allowing people to cherry-pick the features they need.
You pay the performance overhead for only what's you are using.
Given `withStyles` is our internal styling solution, all the plugins aren't available by default. We have added the following list:
- [jss-global](http://cssinjs.org/jss-global/)
- [jss-nested](http://cssinjs.org/jss-nested/)
- [jss-camel-case](http://cssinjs.org/jss-camel-case/)
- [jss-default-unit](http://cssinjs.org/jss-default-unit/)
- [jss-vendor-prefixer](http://cssinjs.org/jss-vendor-prefixer/)
- [jss-props-sort](http://cssinjs.org/jss-props-sort/)

It's a subset of [jss-preset-default](http://cssinjs.org/jss-preset-default/).
Of course, you are free to add a new plugin. We have one example for the [`jss-rtl` plugin](/guides/right-to-left#3-jss-rtl).

## API

### `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component.
It does not modify the component passed to it; instead, it returns a new component with a `classes` property.
This `classes` object contains the name of the class names injected in the DOM.

Some implementation details that might be interesting to being aware of:
- It adds a `classes` property so you can override the injected class names from the outside.
- It adds an `innerRef` property so you can get a reference to the wrapped component. The usage of `innerRef` is identical to `ref`.
- It forwards *non React static* properties so this HOC is more "transparent".
For instance, it can be used to defined a `getInitialProps()` static method (next.js).

#### Arguments

1. `styles` (*Function | Object*): A function generating the styles or a styles object.
It will be linked to the component.
Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (*Object* [optional]):
  - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
  - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging.
    If the value isn't provided, it will try to fallback to the name of the component.
  - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
  - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet).

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Examples

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

Also, you can use as [decorators](https://babeljs.io/docs/plugins/transform-decorators/) like so:

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

A function which returns [a class name generator function](http://cssinjs.org/js-api#generate-your-own-class-names).

#### Arguments

1. `options` (*Object* [optional]):
  - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): Defaults to `false`. Makes the Material-UI class names deterministic.
  - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. The string used to prefix the class names in production.
  - `options.seed` (*String* [optional]): Defaults to `''`. The string used to uniquely identify the generator. It can be used to avoid class name collisions when using multiple generators.

#### Returns

`class name generator`: The generator should be provided to JSS.

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

Do you think that [higher-order components are the new mixins](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)? Rest assured we don't, however because `withStyles()` is a higher-order component, it can be extended with just a **few lines of code** to match different patterns that are all idiomatic React. Here are a couple of examples.

### Render props API (+11 lines)

The term [“render prop”](https://reactjs.org/docs/render-props.html) refers to a simple technique for sharing code between React components using a prop whose value is a function.

```jsx
// You will find the `createStyled` implementation in the source of the demo.
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

{{"demo": "pages/customization/css-in-js/RenderProps.js"}}

You can access the theme the same way you would do it with `withStyles`:
```js
const Styled = createStyled(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
```

[@jedwards1211](https://github.com/jedwards1211) Has taken the time to move this module into a package: [material-ui-render-props-styles](https://github.com/jcoreio/material-ui-render-props-styles). Feel free to use it.

### styled-components API (+15 lines)

styled-components's API removes the mapping between components and styles. Using components as a low-level styling construct can be simpler.

```jsx
// You will find the `styled` implementation in the source of the demo.
// You can even write CSS with https://github.com/cssinjs/jss-template.
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

{{"demo": "pages/customization/css-in-js/StyledComponents.js"}}

You can access the theme the same way you would do it with `withStyles`:
```js
const MyButton = styled(Button)(theme => ({
  backgroundColor: theme.palette.background.paper,
}));
```
