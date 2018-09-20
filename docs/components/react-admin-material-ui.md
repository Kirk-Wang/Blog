# React-Admin 架构分析：Material-UI 主题定制详解

[示例项目-hello-react-admin](https://github.com/Kirk-Wang/hello-react-admin)

这部分内容，将会根据官方 [customization](https://material-ui.com/customization/themes/) 相关的内容，同时结合 [React-Admin](https://github.com/marmelab/react-admin) 这个项目的本身做一次实战：

# 主题

<p class="description">使用我们的主题自定义 Material-UI。 您可以更改颜色，排版等等。</p>

主题指定组件的颜色，表面的暗度，阴影的级别，ink 元素的适当不透明度等。

主题可让您为应用程序应用一致的色调。它允许您 **定制项目的所有设计方案**，以满足您的业务或品牌的特定需求。

为了提高应用程序之间的一致性，可以选择 light 和 dark 主题类型。 默认情况下，组件使用 light 主题类型。


## 主题提供器

如果您想自定义主题，则需要使用 `MuiThemeProvider` 组件以将主题注入您的应用程序。但是，这是可选的；Material-UI组件带有默认主题。

`MuiThemeProvider`依赖于React的上下文功能将主题传递给组件，因此，您需要确保 `MuiThemeProvider` 是您尝试自定义的组件的父级。您可以在[API部分](#muithemeprovider)中了解更多相关信息。

## 主题配置变量

更改主题配置变量是将Material-UI与您的需求相匹配的最有效方法。
以下部分介绍了最重要的主题变量：

- [Palette](#palette)
- [Type (light / dark theme)](#type-light-dark-theme-)
- [Typography](#typography)
- [Other variables](#other-variables)
- [Custom variables](#custom-variables)

### Palette

#### Intentions

一个色彩意图是将一个调色盘映射到一个你应用程序中给定的意图。

主题揭示了以下颜色意图：

- primary - 用于表示用户的主要界面元素。
- secondary - 用于表示用户的辅助界面元素。
- error - 用于表示用户应该知道的界面元素。

默认调色板使用前缀为 `A`（`A200`等）的色彩作为次要意图，使用未加前缀的色彩表示其他意图。

如果您想了解更多有关颜色的信息，你可以查看[颜色部分](https://material-ui.com/style/color)。

#### 自定义调色盘

您可以通过在 theme 中包含 `palette` 对象来覆盖默认调色盘值。

如果有任何 [`palette.primary`](/customization/default-theme?expend-path=$.palette.primary)，
[`palette.secondary`](/customization/default-theme?expend-path=$.palette.secondary) 或者
[`palette.error`](/customization/default-theme?expend-path=$.palette.error) 的 `意图` 对象被提供，它们将会替换默认的值。

意图值可以是 [color](https://material-ui.com/style/color) 对象，也可以是具有以下一个或多个键的对象：

```js
interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};
```

**使用一个 color 对象**

自定义意图的最简单方法是导入一个或多个提供的颜色并将其应用于调色板意图：

```js
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
```

在这里，我有点好奇，blue 里面是啥？翻下源码看下：

```js
const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff',
};

export default blue;
```

如果意图键接收到颜色对象，如上例所示，以下映射用于填充所需的键：

```js
palette: {
  primary: {
    light: palette.primary[300],
    main: palette.primary[500],
    dark: palette.primary[700],
    contrastText: getContrastText(palette.primary[500]),
  },
  secondary: {
    light: palette.secondary.A200,
    main: palette.secondary.A400,
    dark: palette.secondary.A700,
    contrastText: getContrastText(palette.secondary.A400),
  },
  error: {
    light: palette.error[300],
    main: palette.error[500],
    dark: palette.error[700],
    contrastText: getContrastText(palette.error[500]),
  },
},
```

此示例说明了如何重新创建默认调色板值：

```js
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// 以下所有键都是可选的。
// 我们尽力提供一个很好的默认值。
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    // 使用 `getContrastText()` 来最大化背景和文本之间的对比度。
    contrastThreshold: 3, // 对比阈值
    // 用于在其色调调色板中将颜色的亮度移动大约两个索引。
    // 例如，从红色500转换到红色300或红色700。
    tonalOffset: 0.2, // 色调偏移
  },
});
```

**直接提供颜色**

如果您想提供更多自定义颜色，您可以创建自己的颜色对象，或直接为部分或全部意图的 key 提供颜色：

```js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: 将从 palette.primary.main 计算,
      main: '#ff4400',
      // dark: 将从 palette.primary.main 计算,
      // contrastText: 将计算与 palette.primary.main 对比
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: 将从palette.secondary.main计算,
      contrastText: '#ffcc00',
    },
    // error: 将使用默认颜色
  },
});
```

如上例所示，如果意图对象包含使用任何 `main`，`light`，`dark` 或 `contrastText` 键的自定义颜色，则这些映射如下：

- 如果省略 `dark` 和/或 `light` 键，它们的值将根据 `tonalOffset` 值从 `main` 计算得出。

- 如果省略 `contrastText`，它的值将被计算为与 `main` 形成对比，根据 `conttrastThreshold` 值。

可以根据需要自定义 `tonalOffset` 和 `contrastThreshold` 值。
`tonalOffset` 的值越高，`light` 的计算值越亮，`dark` 越暗。
`contrastThreshold` 的值越大，背景颜色被认为是光的点，并且给出一个暗的 `contrastText`。

请注意，`contrastThreshold` 遵循非线性曲线。

[示例](https://codesandbox.io/s/489mq5m089)

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/489mq5m089)

#### 颜色工具

需要灵感？ Material Design团队构建了一个非常棒的[调色板配置工具](https://material-ui.com/style/color#color-tool)来帮助您。

### 类型 (明 /暗 主题)

您可以通过将 `type` 设置为 `dark` 来使主题变暗。
虽然它只是单个属性值更改，但在内部它会修改以下键的值：

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

[DartTheme](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/customization/themes/DarkTheme.js)

### 排版

一次太多的 type sizes 和 styles 会破坏任何布局。
主题提供了一组 **有限的 type sizes**，它们与 layout grid 一起很好地协同工作。
这些 sizes 用于各个组件。

请查看以下有关更改默认值的示例，例如字体系列。
如果您想了解有关排版的更多信息，可以查看[排版部分](/style/typography)。

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j4z35rq6jw)

### 排版 - 字体

```js
const theme = createMuiTheme({
  typography: {
    // 使用系统字体而不是默认的Roboto字体。
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### 排版 - 字体大小

Material-UI 使用 `rem` 单位表示字体大小。
浏览器 `<html>` 元素的默认字体大小是 `16px` ，但浏览器可以选择更改此值，所以 `rem` 单元允许我们适应用户的设置，从而带来更好的用户体验。用户可以出于各种原因更改字体大小设置，从视力不佳到为大小和观看距离差异很大的设备选择最佳设置。

要更改 Material-UI 的字体大小，您可以提供 `fontSize` 属性。默认值为 `14px`。

```js
const theme = createMuiTheme({
  typography: {
    // 在日语中，字符通常较大。
    fontSize: 12,
  },
});
```

浏览器计算出的字体大小遵循以下数学公式：

![font-size](https://material-ui.com/static/images/font-size.gif)

### 排版 - HTML 字体大小

您可能想要更改 `<html>` 元素的默认字体大小。 例如，[简单使用 `10px`](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/) 时。
我们为这个用例提供了一个 `htmlFontSize` 主题属性。它告诉 Material-UI `<html>` 元素的字体大小是多少。
它用于调整 `rem` 值，因此计算出的字体大小始终与规范匹配。

```js
const theme = createMuiTheme({
  typography: {
    // 告诉 Material-UI html 元素的字体大小是什么。
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*您需要在此页面的html元素上应用上述CSS，以查看正确呈现的以下演示*

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n7049n123m)

### 其他变量

除了调色板（palette），暗色（dark）和亮色（light）类型以及排版（typography）外，主题还通过提供更多默认值（例如断点（breakpoints），阴影（shadows），过渡（transitions）等）来规范化实现。
您可以查看[默认主题部分](https://material-ui.com/customization/default-theme)以完整查看默认主题。

### 自定义变量

将 Material-UI 的 [样式解决方案](https://material-ui.com/customization/css-in-js) 与您自己的组件一起使用时，您也可以利用该主题。可以方便地向主题添加其他变量，以便您可以在任何地方使用它们。例如：

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0x4yj0kw5n)

## 自定义组件类型的所有实例

### CSS

当配置变量不满足需求时，你可以利用 `theme` 的 `overrides` 键来改变 Material-UI 注入到 DOM 中的每一个 **style**。
这是一个非常强大的功能。

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // 组件的名称 ⚛️ / style sheet
      root: { // 规则的名称
        color: 'white', // 一些 CSS
      },
    },
  },
});
```

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6298l8pz3)

每个组件的这些自定义点列表都记录在 **Component API** 部分下。
例如，你可以看看[按钮](https://material-ui.com/api/button#css-api)。
或者，您可以随时查看[实现源码](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js)

### 属性

您还可以在一个组件类型的所有实例上应用属性。
我们在这个用例的 `theme` 中公开了一个 `props` 键。

```js
const theme = createMuiTheme({
  props: {
    // 组件的名称 ⚛️
    MuiButtonBase: {
      // 要应用的属性
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2o4zjwrp4n)

## 访问组件中的主题

您可能需要访问React组件中的主题变量。
假设您要显示 primary color 的值，可以使用 `withTheme()` 高阶组件来执行此操作。 这是一个例子：

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/8nv0x0xx3l)

## 嵌套主题

主题解决方案非常灵活，因为您可以嵌套多个主题提供程序。
在处理具有彼此明显外观的应用程序的不同区域时，这非常有用。

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/w7v5xzv6y5)

#### 关于性能的说明

嵌套 `MuiThemeProvider` 组件的性能影响与 JSS 在幕后的工作相关联。
要理解的要点是我们使用以下元组 `(styles, theme)` 来缓存注入的 CSS。
- `theme`: 如果在每个渲染中提供新主题，则将计算并注入新的 CSS 对象。对于 UI 一致性和性能，最好渲染有限数量的主题对象。
- `styles`: 样式对象越大，所需的工作就越多。

## API

### `MuiThemeProvider`

该组件接受一个 `theme` 属性，并通过 React 上下文使 `theme` 在 React 树下可用。
它最好使用在 **组件树的根上**。

您可以在[这个专用页面](https://material-ui.com/api/mui-theme-provider)中看到完整的属性 API。

#### 示例

```jsx
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Root from './Root';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

### `createMuiTheme(options) => theme`

根据接收到的选项生成主题。

#### 参数

1. `options` (*Object*): 获取一个不完整的主题对象并添加缺少的部分。

#### 返回

`theme` (*Object*): 一个完整的，准备使用的主题对象。

#### 示例

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `withTheme()(Component) => Component`

提供 `theme` 对象作为输入组件的属性，以便它可以在 render 方法中使用。

#### 参数

1. `Component`: 要包装的组件。

#### 返回

`Component`: 创建的新组件。

#### 示例

```js
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme()(MyComponent);
```

# 重写

<p class="description">由于组件可以在不同的上下文中使用，因此Material-UI支持从最特定到最通用的不同类型的定制需求。</p>

1. [一次性情况下的特定变化](#1-specific-variation-for-a-one-time-situation)
1. [一次性情况下的动态变化](#2-dynamic-variation-for-a-one-time-situation)
1. [组件的特定变化](#3-specific-variation-of-a-component) re-used in different contexts
1. [Material Design的变化](#4-material-design-variations) such as with the button component
1. [全局主题变化](#5-global-theme-variation)

## 1. 一次性情况下的特定变化

在某些非常特定的情况下，您可能需要更改组件的样式，您可以使用以下解决方案:

### 用类名重写

重写组件样式的第一种方法是使用 **类名**。
每个组件都提供一个 `className` 属性，该属性总是应用于根元素。

在本例中，我们使用 [`withStyles()`](/customization/css-in-js#withstyles-styles-options-higher-order-component) 高阶组件将自定义样式注入 DOM，并通过`classes` 属性将类名传递给 `ClassNames` 组件。你可以选择其他样式解决方案，甚至是纯 CSS 创建的样式，但一定要考虑[CSS 注入顺序](/customization/css-in-js#css-injection-order)，as the CSS injected into the DOM by Material-UI to style a component has the highest specificity possible since the `<link>` is injected at the bottom of the `<head />` to ensure the components always render correctly.

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m4o52vn0kp)

### Overriding with classes

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` property to customize all the CSS injected by Material-UI for a given component.
The list of  classes for each
component is documented in the **Component API** section.
For instance, you can have a look at the [Button CSS API](/api/button#css-api).
Alternatively, you can always look at the [implementation details](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

This example also uses `withStyles()` (see above), but here, `ClassesNesting` is using `Button`'s `classes` prop to
provide an object that maps the **names of classes to override** (keys) to the **CSS class names to apply** (values).
The component's existing classes will continue to be injected, so it is only necessary to provide the specific styles
you wish to add or override.

Notice that in addition to the button styling, the button label's capitalization has been changed:

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

#### Shorthand

The above code example can be condensed by using **the same CSS API** as the child component.
In this example, the `withStyles()` higher-order component is injecting a `classes` property that is used by the [`Button` component](/api/button#css-api).

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/overrides/ClassesShorthand.js"}}

#### Internal states

Aside from accessing nested elements, the `classes` property can be used to customize the internal states of Material-UI components.
The components internal states, like `:hover`, `:focus`, `disabled` and `selected`, are styled with a higher CSS specificity.
[Specificity is a weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) that is applied to a given CSS declaration.
In order to override the components internal states, **you need to increase specificity**.
Here is an example with the `disable` state and the button component:

```css
.classes-state-root {
  /* ... */
}
.classes-state-root.disabled {
  color: white;
}
```

```jsx

<Button
  disabled
  classes={{
    root: 'classes-state-root',
    disabled: 'disabled', }
  }
>

```

#### Use `$ruleName` to reference a local rule within the same style sheet

The [jss-nested](https://github.com/cssinjs/jss-nested) plugin (available by default) can make the process of increasing specificity easier.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

compiles to:

```css
.root-x.disable-x {
  color: white;
}
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### Overriding with inline-style

The second way to override the style of a component is to use the **inline-style** approach.
Every component provides a `style` property.
These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[When should I use inline-style vs classes?](/getting-started/faq#when-should-i-use-inline-style-vs-classes-)

## 2. Dynamic variation for a one-time situation

You have learned how to override the style of the Material-UI components in the previous sections.
Now, let's see how we can make these overrides dynamic.
We demonstrate 5 alternatives, each has it's pros and cons.

### withStyles property support

```jsx
const styles = {
  button: {
    background: props => props.color,
  },
};
```

This feature isn't ready yet.
It will come with: [#7633](https://github.com/mui-org/material-ui/issues/7633).

### Class name branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### CSS variables

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### Inline-style

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### Theme nesting

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3. Specific variation of a component

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page, however you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4. Material Design variations

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [text](https://material.io/design/components/buttons.html#text-button) (AKA "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (AKA "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components) documentation to find out the current status of all supported Material Design components.

## 5. Global theme variation

### Theme variables

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes by adjusting the [theme configuration variables](/customization/themes#theme-configuration-variables).

### Global theme override

Do you want to customize **all the instances** of a component type?

When the configuration variables aren't powerful enough,
you can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM.
Learn more about it in the [themes section](/customization/themes#customizing-all-instances-of-a-component-type) of the documentation.

### Global CSS override

You can also customize all instances of a component with CSS.
We expose a `dangerouslyUseGlobalCSS` option to do so.
Learn more about it in the [CSS in JS section](/customization/css-in-js#global-css) of the documentation. It's very similar to how you would customize Bootstrap.
