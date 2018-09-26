# React-Admin 架构分析：`Admin` 组件源码解析之 `appLayout` 属性

[示例项目-hello-react-admin](https://github.com/Kirk-Wang/hello-react-admin)

为什么需要 `appLayout`?

在一个应用程序界面中，你总会看到一些始终存在的公共部分，如：(菜单栏，导航栏或者工具栏)。`appLayout` 规范了整个应用程序的界面，哪些是公共的，哪些是可变的。

### 默认 Layout 组件

在 `react-admin` 包中，我们发现 react-admin 默认的 layout 位于 `ra-ui-materialui` 包中。

当前可以在 `packages/ra-ui-materialui/src/layout/Layout.js` 目录下找到源码。

我们来看下它组件🌲：

1. 这个文件最终导出的默认组件是 `LayoutWithTheme`，它渲染了如下组件：

```jsx
<MuiThemeProvider theme={this.theme}>
    <EnhancedLayout {...rest} />
</MuiThemeProvider>
```

`MuiThemeProvider` 是 `material-ui` 提供的上层组件，它被用来在上下文中提供一个 `theme` 的主题对象。