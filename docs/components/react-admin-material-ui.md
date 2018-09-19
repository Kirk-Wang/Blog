### React-Admin 架构分析：Material-UI 主题定制详解

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

### Typography - Font family

```js
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
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

### Typography - Font size

Material-UI uses `rem` units for the font size.
The browser `<html>` element default font size is `16px`, but browsers have an option to change this value,
so `rem` units allow us to accommodate the user's settings, resulting in a much better user experience.
Users change font size settings for all kinds of reasons, from poor eyesight to choosing optimum settings
for devices that can be vastly different in size and viewing distance.

To change the font-size of Material-UI you can provide a `fontSize` property.
The default value is `14px`.

```js
const theme = createMuiTheme({
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 12,
  },
});
```

The computed font size by the browser follows this mathematical equation:

![font-size](/static/images/font-size.gif)
<!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

### Typography - HTML font size

You might want to change the `<html>` element default font size. For instance, when using the [10px simplification](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).
We provide a `htmlFontSize` theme property for this use case.
It's telling Material-UI what's the font-size on the `<html>` element is.
It's used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*You need to apply the above CSS on the html element of this page to see the below demo rendered correctly*

{{"demo": "pages/customization/themes/FontSizeTheme.js"}}

### Other variables

In addition to the palette, dark and light types, and typography, the theme normalizes implementation by providing many more default values, such as breakpoints, shadows, transitions, etc.
You can check out the [default theme section](/customization/default-theme) to view the default theme in full.

### Custom variables

When using Material-UI's [styling solution](/customization/css-in-js) with your own components,
you can also take advantage of the theme.
It can be convenient to add additional variables to the theme so you can use them everywhere.
For instance:

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## Customizing all instances of a component type

### CSS

When the configuration variables aren't powerful enough, you can take advantage of the
`overrides` key of the `theme` to potentially change every single **style** injected by Material-UI into the DOM.
That's a really powerful feature.

```js
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'white', // Some CSS
      },
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesCss.js"}}

The list of these customization points for each component is documented under the **Component API** section.
For instance, you can have a look at the [Button](/api/button#css-api).
Alternatively, you can always have a look at the [implementation](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

### Properties

You can also apply properties on all the instances of a component type.
We expose a `props` key in the `theme` for this use case.

```js
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
```

{{"demo": "pages/customization/themes/OverridesProperties.js"}}

## Accessing the theme in a component

You might need to access the theme variables inside your React components.
Let's say you want to display the value of the primary color, you can use the `withTheme()` higher-order component to do so. Here is an example:

{{"demo": "pages/customization/themes/WithTheme.js"}}

## Nesting the theme

The theming solution is very flexible, as you can nest multiple theme providers.
This can be really useful when dealing with different area of your application that have distinct appearance from each other.

{{"demo": "pages/customization/themes/Nested.js"}}

#### A note on performance

The performance implications of nesting the `MuiThemeProvider` component are linked to JSS's work behind the scenes.
The main point to understand is that we cache the injected CSS with the following tuple `(styles, theme)`.
- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `MuiThemeProvider`

This component takes a `theme` property, and makes the `theme` available down the React tree thanks to React context.
It should preferably be used at **the root of your component tree**.

You can see the full properties API in [this dedicated page](/api/mui-theme-provider).

#### Examples

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

Generate a theme base on the options received.

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Examples

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

Provide the `theme` object as a property of the input component so it can be used
in the render method.

#### Arguments

1. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created.

#### Examples

```js
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme()(MyComponent);
```
