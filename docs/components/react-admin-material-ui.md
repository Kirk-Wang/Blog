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