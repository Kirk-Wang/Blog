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

