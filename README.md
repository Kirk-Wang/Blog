# React-Admin-App

## 使用 React-Admin 开发中后台应用

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

#### demo E-R 图
![](./demo-json-er.jpg)

#### 准备数据
[fetch-mock](https://github.com/wheresrhys/fetch-mock)：当使用 fetch 时，模拟返回一个 http request 的 response。

示例：（详细用法可以参考[fetch-mock's quickstart](http://www.wheresrhys.co.uk/fetch-mock/quickstart)）

```js
const fetchMock = require('fetch-mock');

// hack native(fetch) implementation
fetchMock.mock('http://example.com', () => {
    return {
        hello: 'world!'
    };
});

async function mockRequest() {
    let res = await fetch('http://example.com');
    console.log(res);
    // restore fetch() to its native implementation 
    fetchMock.restore();
    console.log('---------------Unmatched--------------');
    res = await fetch('http://example.com');
    console.log(res);
}

mockRequest();
```

可以通过运行以下命令查看效果：

```sh
node third-example/fetch-mock.js
```
