# React-Admin 架构分析：Material-UI 定制之 `Overrides` 文档

<p class="description">由于组件可以在不同的上下文中使用，因此 Material-UI 支持从最特定到最通用的不同类型的定制需求。</p>

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

### 通过 classes 重写

当 `className` 属性不够，并且您需要访问更深层的元素时，您可以利用 `classes` 属性来自定义 Material-UI 为给定组件注入的所有 CSS。
每个组件的 classes 列表都记录在 **Component API** 部分中。
例如，您可以查看[Button CSS API](https://material-ui.com/api/button#css-api).
或者，您可以随时查看[实现细节](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

这个例子也使用 `withStyles()`（见上文），但是在这里，`ClassesNesting` 使用 `Button` 的 `classes` 属性来提供一个对象，该对象映射 classes 的 key 名来覆盖 Button 的 CSS 类名。组件的现有类将继续注入，因此只需要提供您希望添加或覆盖的特定样式。

请注意，除按钮样式外，按钮标签的大小写也已更改：

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4w6px2nrq4)

#### 简写

上面的代码示例可以通过使用 **与子组件相同的CSS API** 来简练。
在此示例中，`withStyles()` 高阶组件正在注入 [`Button` 组件](https://material-ui.com/api/button#css-api) 使用的 `classes` 属性。

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

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vq9jxq7qx5)

#### 内部状态

除了访问嵌套元素之外，`classes` 属性还可用于自定义 Material-UI 组件的内部状态。
组件内部状态，如 `:hover` ，`:focus` ，`disabled` 和 `selected`，具有更高的 CSS 优先级。
[优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)就是分配给指定的 CSS 声明的一个权重，为了覆盖组件内部状态，**需要增加优先级**。
以下是 `disable` 状态和按钮组件的示例：

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

#### 使用 `$ruleName` 引用同一样式表中的本地规则

[jss-nested](https://github.com/cssinjs/jss-nested) 插件（默认情况下可用）可以使增加优先级的过程更容易。

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

编译为：

```css
.root-x.disable-x {
  color: white;
}
```

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1z31z7rolj)

### 覆写内联样式

覆盖组件样式的第二种方法是使用 **内联式** 方法。
每个组件都提供 `style` 属性。
这些属性始终应用于根元素。

您不必担心 CSS 优先级，因为内联样式优先于常规CSS。

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6n2q5ro783)

[When should I use inline-style vs classes?](https://material-ui.com/getting-started/faq#when-should-i-use-inline-style-vs-classes-)

## 2. 一次性情况的动态变化

您已经学习了如何重写前面部分中的 Material-UI 组件的样式。
现在，让我们看看我们如何使这些重写动态化。
我们展示了5种替代方案，每种方案都有其优缺点。

### withStyles 属性支持

```jsx
const styles = {
  button: {
    background: props => props.color,
  },
};
```

此功能尚未准备好。
它会带来：[#7633](https://github.com/mui-org/material-ui/issues/7633).

### 类名分支

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1wv7w31r97)

### CSS 变量

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j4vxywjz5y)

### 内联样式

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m4popw7rzy)

### 主题嵌套

[![Edit Material demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/z63j0wjny4)

## 3. 组件的具体变化

您可能需要创建组件的变量并在不同的上下文中使用它，例如产品页面上的彩色按钮，但是您可能希望保留代码[*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)。

最好的方法是遵循选项1，然后通过导出自定义组件来利用 React 的组合功能，以便在任何需要的地方使用。

[demo](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/customization/overrides/Component.js)

## 4. Material Design 变化

Material Design 规范记录了某些组件的不同变体，例如按钮的形状有多种：[文本](https://material.io/design/components/buttons.html#text-button)（AKA“扁平”），[包含](https://material.io/design/components/buttons.html#contained-button)（AKA“凸起”），[FAB](https://material.io/design/components/buttons-floating-action-button.html)等。

Material-UI 尝试实现所有这些变化。请参阅[Supported Components](https://material-ui.com/getting-started/supported-components)文档以了解所有支持的Material Design组件的当前状态。

## 5. 全局主题变化

### 主题变量

为了促进组件之间的一致性，并管理整个用户界面外观，Material-UI 提供了一种机制，通过调整[主题配置变量](https://material-ui.com/customization/themes#theme-configuration-variables)来应用全局更改。

### 全球主题重写

是否要自定义组件类型的 **所有实例**?

当配置变量不够强大时，您可以利用 `theme` 的 `overrides` 键，潜在地改变 Material-UI 注入 DOM 的每一种风格。在文档的[主题部分](https://material-ui.com/customization/themes#customizing-all-instances-of-a-component-type)了解更多。

### 全局 CSS 重写

您还可以使用 CSS 定制组件的所有实例。
我们提供了一个 `dangerouslyUseGlobalCSS` 选项。
在文档的[CSS in JS section](https://material-ui.com/customization/css-in-js#global-css)中了解更多。它非常类似于如何自定义 Bootstrap。