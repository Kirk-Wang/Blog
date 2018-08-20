# React-Admin-App

## 使用 React-Admin 实战中后台应用

### 初始化项目（create-react-app，这里采用 TS)

```sh
npm install -g create-react-app

create-react-app my-app --scripts-version=react-scripts-ts
cd my-app/
npm start
```

### Git commit 日志标准

这里直接接入 [git-commit-style-guide](https://github.com/feflow/git-commit-style-guide)

![](https://github.com/feflow/git-commit-style-guide/raw/master/img/git-commit-message-mindmap.png)

**所有的 type 类型如下：**

> type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。

* feat： 新增 feature
* fix: 修复 bug
* docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
* style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
* refactor: 代码重构，没有加新功能或者修复 bug
* perf: 优化相关，比如提升性能、体验
* test: 测试用例，包括单元测试、集成测试等
* chore: 改变构建流程、或者增加依赖库、工具等
* revert: 回滚到上一个版本

### tslint
采用 [@blueprintjs/tslint-config](https://www.npmjs.com/package/@blueprintjs/tslint-config) 规则

![](https://cloud.githubusercontent.com/assets/464822/20228152/d3f36dc2-a804-11e6-80ff-51ada2d13ea7.png)

### React-Admin demo 分析

#### React-Admin 相关基本概念
* React-Admin：一个前端框架，主要用来构建 Admin App（中后台应用程序）。他采用 React 生态系统中最优秀的库（[material-ui](https://material-ui.com/), [redux](https://redux.js.org/), [redux-form](https://redux-form.com/7.3.0/), [redux-saga](https://redux-saga.js.org/), [react-router](https://reacttraining.com/react-router/), [recompose](https://github.com/acdlite/recompose), [reselect](https://github.com/reduxjs/reselect)）构建而成。这些库基本都在 1w+ 以上。React-Admin 真正糅合了它们，并且它拥有完善的测试用例，仓库基本每天都更新。

#### 数据服务器伪造
[fetch-mock](https://github.com/wheresrhys/fetch-mock)：当使用 fetch 时，模拟返回一个 http request 的 response。

[FakeRest](https://github.com/marmelab/FakeRest)：拦截一个 AJAX 调用到一个基于 JSON 数据伪造的 REST 服务器。在 Sinon.js（针对 XMLHTTPRequest）或 fetch-mock（针对 fetch）之上使用它来测试浏览器端的 JavaScript REST 客户端（例如单页应用程序），而无需服务器。

Fake Rest Server 示例代码（[demo](https://o-o.ren/react-admin-app/examples/fetch.html) | [demo source](./docs/examples/fetch.html)）

```js
// 初始化一个伪造的 Rest Server
var restServer = new FakeRest.FetchServer('http://fakeapi');
// 为 Rest Server 提供数据
restServer.init({
    'authors': [
        { id: 0, first_name: 'Leo', last_name: 'Tolstoi' },
        { id: 1, first_name: 'Jane', last_name: 'Austen' }
    ],
    'books': [
        { id: 0, author_id: 0, title: 'Anna Karenina' },
        { id: 1, author_id: 0, title: 'War and Peace' },
        { id: 2, author_id: 1, title: 'Pride and Prejudice' },
        { id: 3, author_id: 1, title: 'Sense and Sensibility' }
    ]
});
// 打印 fetch 日志，它默认是关闭的
restServer.toggleLogging();

// 使用 restServer 作为 fetch mock
fetchMock.mock(/^http\:\/\/fakeapi/, restServer.getHandler())

// 现在查询这个伪造的 REST server
fetch('http://fakeapi/authors?range=%5B0,1%5D')
    .then(res => res.text())
    .then(res => document.getElementById('req1').value = res);

fetch('http://fakeapi/books/3')
    .then(res => res.text())
    .then(res => document.getElementById('req2').value = res);

fetch('http://fakeapi/books', {
        method: 'POST',
        body: JSON.stringify({ author_id: 1, title: 'Emma' })
    })
    .then(res => res.text())
    .then(res => document.getElementById('req3').value = res);

// 恢复原生 fetch 功能
fetchMock.restore();
```

#### demo 数据生成

我这里直接将 [data-generator](https://github.com/marmelab/react-admin/tree/master/examples/data-generator) 改造成一个 typescript 版本。放到 src 下。

#### demo 前端数据 E-R 图
![](./docs/images/demo-json-er.jpg)


#### Customers List [UI界面分析](https://marmelab.com/react-admin-demo/#/customers)
1. 要展示的字段
![](./docs/images/customers-list-field.jpg)

2. 通过 E-R 图，我知道这个 customer field 展示组件由三个数据字段（avatar，first_name，last_name）组成。并且是一个 a 链接，指向 Edit 视图。因此这个自定义组件可以设计成这样：
![](./docs/images/CustomerLinkField.jpg)
3. 自定义组件（FullNameField）中，有用到[recompose/pure](https://github.com/acdlite/recompose/blob/e1b5359fc611a2eb8df94cd6c39b709e16294156/src/packages/recompose/pure.js)（用它来做一个高阶处理，使用 shallowEqual() 方法在高阶组件 shouldComponentUpdate 中决定组件是否执行 render）。[Recompose](https://github.com/acdlite/recompose) 是一个用于创建函数式组件和高阶组件的 React 工具库。
4. 从 react-admin 导出 DateField 组件，用来展示 Last seen(last_seen)。并指明 type 是 date。
5. 从 react-admin 导出 NumberField 组件，用来展示 Orders(nb_commands)。
6. 使用自定义组件 ColoredNumberField 展示 Total spent(total_spent)。使用 material-ui 提供的 withStyles 方法修复官方 demo 中 ColoredNumberField 金额大于 500 不飘红的问题。
```jsx
    withStyles(fieldStyles)(
        ({ classes, ...props }: any) =>
            props.record[props.source] > 500 ? (
                <WrappedComponent {...props} className={classes.color} />
            ) : (
                <WrappedComponent {...props} />
            ));
```
7. 从 react-admin 导出 DateField 组件，用来展示 Latest purchase(last_purchase)。指定 showTime，用来显示时分秒。
8. 从 react-admin 导出 BooleanField 组件，用来展示 News.(has_newsletter)。
9. 加入自定义组件 SegmentsField。包裹 material-ui 的 Chip 组件。
10. 从 react-admin 导出 EditButton 组件，用来路由到编辑视图。
11. 利用 withStyles 为 list 注入className（这里主要是改变 Orders 的颜色）

#### i18n（国际化）
对于一个 App 来说，一开始就做多语言是一件好的事情，这里我们对 App 做中英文的支撑：

1. 安装语言包：
```sh
npm install --save ra-language-chinese ra-language-english
```
2. src 下新增 i18n 文件夹，新增 en.ts 和 cn.ts


en.ts
```js
import english from "ra-language-english";

export const englishMessages = {
    ...english,
    pos: {},
};
```
cn.ts
```js
import chinese from "ra-language-chinese";

export const chineseMessages = {
    ...chinese,
    pos: {},
};
```
3. App.tsx 引入文件并配置：
```jsx
import { englishMessages } from "./i18n/en";
import { chineseMessages } from "./i18n/cn";

const messages = {
    cn: chineseMessages,
    en: englishMessages,
};

const i18nProvider = (locale: string) => messages[locale];

<Admin dataProvider={dataProvider} locale="cn" i18nProvider={i18nProvider}>
    <Resource list={CustomerList} name="customers" />
</Admin>
```
