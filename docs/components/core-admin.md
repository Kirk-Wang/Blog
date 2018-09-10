### React-Admin 架构分析：全面解析 Admin 组件功能及实现原理

用好 React-Admin，其实就是用好它暴露出来的 Admin 组件。它的实现可以说就是整个 react-admin 项目架构的实现。

接下来会逐一讲解它的每一个属性，以及 Admin 组件用它们做了什么❓（文章很长，请自备瓜子^_^）

#### 首先，我们需要把 <Admin/> 组件跑起来：

1. 这里选用 [Create React App](https://github.com/facebook/create-react-app) 作为基础脚手架。OK，我们快速用它创建一个 App：

```sh
npx create-react-app hello-react-admin
cd hello-react-admin
npm start
```
