## React-Admin-App [ROADMAP UNKNOWN……]

### 怒刷React源码实现

#### 刷React源码大纲
![刷React源码大纲](./docs/images/react/react-1.png)


#### 浅聊 Virtual DOM
![浅聊 Virtual DOM](./docs/images/react/virtual_dom.png)


### React-Admin 相关

[官方文档](https://marmelab.com/react-admin/)

[中文文档](https://www.react-admin.com)

* [简介](https://www.react-admin.com/docs/zh-CN/intro.html)
* [十分钟教程](https://www.react-admin.com/docs/zh-CN/tutorial.html)
* [数据提供程序](https://www.react-admin.com/docs/zh-CN/data-providers.html)
* [Admin 组件](https://www.react-admin.com/docs/zh-CN/admin-component.html)
* [Resource 组件](https://www.react-admin.com/docs/zh-CN/resource-component.html)
* [List 视图组件](https://www.react-admin.com/docs/zh-CN/list-view-component.html)
* [Show 视图组件](https://www.react-admin.com/docs/zh-CN/show-view-component.html)
* [Field 组件](https://www.react-admin.com/docs/zh-CN/field-components.html)
* [Create 和 Edit 视图组件](https://www.react-admin.com/docs/zh-CN/creat-edit-view-components.html)
* [Input 组件](https://www.react-admin.com/docs/zh-CN/input-components.html)
* [身份验证](https://www.react-admin.com/docs/zh-CN/authentication.html)
* [授权](https://www.react-admin.com/docs/zh-CN/authorization.html)
* [主题](https://www.react-admin.com/docs/zh-CN/theming.html)
* [编写 Action](https://www.react-admin.com/docs/zh-CN/actions.html)
* [i18n](https://www.react-admin.com/docs/zh-CN/translation.html)
* [在其它 App 中包含 Admin](https://www.react-admin.com/docs/zh-CN/custom-app.html)
* [引用](https://www.react-admin.com/docs/zh-CN/reference.html)
* [常见问题](https://www.react-admin.com/docs/zh-CN/faq.html)
* [生态](https://www.react-admin.com/docs/zh-CN/ecosystem.html)

### 核心组件及源码分析

扩展安装：[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

1. [调试 React-Admin 源码，看清框架的本质](./docs/stories/debug-react-admin.md)
2. [`localhost:8080` 背后的动作](./docs/stories/redux-devtools/npm-start.md)
3. [`localhost:8080/#/login` 背后的动作](./docs/stories/redux-devtools/route-login.md)

* [React-Admin 架构分析：`Admin` 组件源码解析之 `dataProvider` 属性](./docs/stories/core-admin-data-provider.md)
* [React-Admin 架构分析：Material-UI 定制](./docs/stories/material-ui-customization.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Themes` 文档](./docs/stories/material-ui-customization-themes.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Overrides` 文档](./docs/stories/material-ui-customization-overrides.md)
    * [React-Admin 架构分析：Material-UI 定制之 `CSS in JS` 文档](./docs/stories/material-ui-customization-css-in-js.md)
    * [React-Admin 架构分析：Material-UI 定制之 `Default Theme` 文档](./docs/stories/material-ui-customization-default-theme.md)
* [React-Admin 架构分析：`Admin` 组件源码解析之 `theme` 属性](./docs/stories/core-admin-app-theme.md)
* [React-Admin 架构分析：`Admin` 组件源码解析之 `appLayout` 属性](./docs/stories/core-admin-app-layout.md)
* [react-admin 包分析](./docs/stories/react-admin-package.md)
* [ra-core 包分析](./docs/stories/ra-core-package.md)
* [Admin 组件源码解析](./docs/stories/Admin.md)（有干货但有些凌乱，留作纪念）
* [CoreAdminRouter 组件源码分析](./docs/stories/CoreAdminRouter.md)（有干货但有些凌乱，留作纪念）
* [最早的想法（留作纪念）](./docs/stories/old-readme.md)

* [ImageInput 相关问题](https://github.com/Kirk-Wang/react-admin-app/issues/1)

### 必知必会

#### ES相关基础

![](./docs/images/jsms/ES_basic.png)

#### JS-WEB-API

![](./docs/images/jsms/JS-WEB-API.png)

#### CSS-HTML

![](./docs/images/jsms/CSS-HTML.png)

### 前端性能优化(首先得知道哪些点可以去操作一波^_^)

#### 图片

![](./docs/images/perf/perf_img.png)

#### 缓存

![](./docs/images/perf/perf_cache.png)

#### 本地存储

![](./docs/images/perf/perf_storage.png)

#### CDN

![](./docs/images/perf/perf_cdn.png)

#### 页面渲染

![](./docs/images/perf/perf_pagerender.png)

#### 浏览器运行机制浅析

![](./docs/images/perf/perf_explorer.png)

#### 浅析DOM优化原理

![](./docs/images/perf/perf_dom.png)

#### Event Loop 与异步更新策略

![](./docs/images/perf/perf_eventloop.png)

### 回流与重绘

![](./docs/images/perf/perf_reflow_repaint.png)

### 首屏

![](./docs/images/perf/perf_homepage.png)

### 防抖与节流

![](./docs/images/perf/perf_th.png)

### 性能监测

![](./docs/images/perf/perf.png)

[react 性能分析](https://react.css88.com/blog/2018/09/10/introducing-the-react-profiler.html#profiling-an-application)

[前端性能优化清单](https://juejin.im/post/5a966bd16fb9a0635172a50a)

[creeperyang/blog](https://github.com/creeperyang/blog/issues)

[把前端监控做到极致](https://juejin.im/post/5a52f138f265da3e5b32a41b)

[js-leakage-patterns](https://github.com/zhansingsong/js-leakage-patterns)

[CS-Interview-Knowledge-Map](https://github.com/InterviewMap/CS-Interview-Knowledge-Map)

### AOP & middleware(1秒懂^_^)

```jsx
const dispatch = action => action;

const a1 = next => action => {
	console.log('a1入栈切面');
	const result = next(action);
	console.log('a1出栈切面');
	return result;
}

const a2 = next => action => {
	console.log('a2入栈切面');
	const result = next(action);
	console.log('a2出栈切面');
	return result;
}

const a3 = next => action => {
	console.log('a3入栈切面');
	const result = next(action);
	console.log('a3出栈切面');
	return result;
}

const enhancer = [a1, a2, a3].reduce((a, b) => action => a(b(action)));

const finalDispatch = enhancer(dispatch);

finalDispatch({type: 'what', payload: 'aop'});

// a1入栈切面
// a2入栈切面
// a3入栈切面
// a3出栈切面
// a2出栈切面
// a1出栈切面
{type: "what", payload: "aop"}
```

### redux-saga

[Redux-Saga 仓库实例精解](./docs/stories/saga/examples-saga.md) (废弃，没价值，大家自行看源码🤣)

### [坦克大战复刻版](https://zhuanlan.zhihu.com/p/35551654) 源码分析：

必备知识：

[SVG 图像入门教程](http://www.ruanyifeng.com/blog/2018/08/svg.html)

[走进SVG](https://www.imooc.com/learn/143)

相关基础知识点：

![](./docs/images/svg.png)

[immutable入坑指南](http://www.aliued.com/?p=4175)

系列文章：

[首屏场景组件 GameTitleScene 的分析](./docs/stories/battle-city/game-title-scene.md)

[关卡选择场景组件 ChooseStageScene 的分析](./docs/stories/battle-city/choose-stage-scene.md)

[游戏场景组件 GameScene 的分析](./docs/stories/battle-city/game-scene.md)

预备知识：

[Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)

[深入浅出 ES6（二）：迭代器和 for-of 循环](http://www.infoq.com/cn/articles/es6-in-depth-iterators-and-the-for-of-loop)

[深入浅出 ES6（三）：生成器 Generators](http://www.infoq.com/cn/articles/es6-in-depth-generators)

**[官方文档](https://redux-saga-in-chinese.js.org/)扫盲**：

1. `Effects` 是一些简单 `Javascript` 对象，包含了要被 `middleware` 执行的指令。
2. `middleware` 检查每个被 `yield` 的 `Effect` 的类型，然后决定如何实现哪个 `Effect`。
3. 记住这是一个 `Generator` 函数，它不具备 从运行至完成 的行为（`run-to-completion behavior`）

相关好文：

[redux-saga 实践总结](https://zhuanlan.zhihu.com/p/23012870)

[浅析redux-saga实现原理](https://zhuanlan.zhihu.com/p/30098155)

总结：[从 Pub/Sub 浅聊 reudx-saga](./docs/stories/saga/pub-sub-saga.md)

[Redux-Saga 漫谈](https://www.yuque.com/lovesueee/blog/redux-saga)

### 脑子里必须清楚的 `redux` `redux-saga` 使用流程。（脑回路一下……）

### 生啃 `redux-saga` 源码：

操练地址：

### 肥超大佬的 [little-saga](https://github.com/little-saga/little-saga)

接下来 `All In Saga`：

**[构建你自己的 redux-saga](https://github.com/little-saga/little-saga/blob/master/docs/building-your-own-redux-saga.md)** 一文：

[总结](./docs/stories/saga/build-saga.md)

### 工程化

### Mac开发配置

#### Git

![Git 配置](./docs/images/mac/git/gitconfig.png)

### [CSSINJS](http://cssinjs.org)

传统的“关注点分离”（separation of concerns）原则中不推荐我们把 HTML、CSS、JS 混杂一起编写，但是在伴随着前端组件模式的大潮"关注点混合"慢慢成为主流。

[漫谈 CSS in JS](https://zhuanlan.zhihu.com/p/31622439)

### 优秀的 blog

[Jony的博客，记录学习工作的点点滴滴](https://github.com/forthealllight/blog)

[冴羽的博客](https://github.com/mqyqingfeng/Blog)

[node-interview](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)

[大话WEB开发](https://github.com/SFLAQiu/web-develop)

[梁少峰的个人博客](https://github.com/youngwind/blog)

### 杂项

[解决chrome提示"您的连接不是私密连接"问题](https://github.com/mrdulin/blog/issues/32)

```sh
openssl req -newkey rsa:2048 -x509 -nodes -keyout server.pem -new -out server.crt -subj /CN=dev.xx.com -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:dev.xx.com')) -sha256 -days 3650
```

### dockerper

[offical install](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

[Error message 'sudo: unable to resolve host <USER>'](https://askubuntu.com/questions/59458/error-message-sudo-unable-to-resolve-host-user)

[Docker CE 镜像源站](https://yq.aliyun.com/articles/110806)

### Skills

[如何绕过chrome的弹窗拦截机制](https://my.oschina.net/jsan/blog/1545859)
