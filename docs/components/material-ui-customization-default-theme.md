# React-Admin 架构分析：Material-UI 定制 `Default Theme` 详解

<p class="description">下面是带有默认值的 theme 对象。</p>

[Default Theme](https://material-ui.com/customization/default-theme/)

主题是通过为调色板(palette)，暗色(dark)和浅色(light)类型，排版(typography)，断点(breakpoints)，阴影(shadows)，过渡(transitions)等提供默认值来规范化的实现。

提示：您也可以在 console 中使用 theme 对象。**我们在所有页面上公开了一个全局 `theme` 变量**。

请注意，文档站点使用自定义主题。因此，您在此处看到的 demo 可能与上述值不同。

如果您想进一步了解主题的组合方式，请查看 [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js) 以及 `createMuiTheme` 使用的相关导入。
