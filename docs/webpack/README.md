### Test

```sh
mkdir my-project
cd my-project
npm init -y

npm install webpack webpack-cli --save-dev
```

通过 npm run build 运行构建

原理：模块局部安装会在 node_modules/.bin 目录创建软链接 

### 核心概念 Entry

Entry 用来指定 webpack 打包入口

### 理解依赖图的含义

依赖图的入口是 entry

对于非代码比如图片、字体依赖也会不断加入到依赖图中

### Entry 的用法
* 单入口：entry 是一个字符串 (单页应用)
* 多入口：entry 是一个对象 (多页应用)

### 核心概念之 Output
* Output 用来告诉 webpack 如何将编译后的文件输出到磁盘

### Output 的用法：单入口配置

### Output 的用法：多入口配置
* 通过占位符确保文件名称的统一
  * `[name].js`

### 核心概念之 Loaders
webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持
其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。

### 常见的 Loaders 有哪些？
|名称|描述|
|---|----|
|babel-loader|转换ES6、ES7等JS新特性|
|css-loader|支持.css 文件的加载和解析|
|less-loader|将 less 文件转换为 css|
|ts-loader|将 TS 转换为 JS|
|file-loader|进行图片、字体等的打包|
|raw-loader|将文件以字符串的形式导入|
|thread-loader|多进程打包 JS 和 CSS|

### Loaders 的用法
* test 指定匹配规则
* use 指定使用的 loader 名称

### 核心概念之 Plugins
* 插件用于 bundle 文件的优化，资源管理和环境变量注入
* 作用于整个构建过程

### 常见的 Plugins 有哪些？
|名称|描述|
|---|----|
|CommonsChunkPlugin|将chunks相同的模块代码提取成公共js|
|CleanWebpackPlugin|清理构建目录|
|ExtractTextWebpackPlugin|将 CSS 从bundle文件里提取成一个独立的 CSS 文件|
|CopyWebpackPlugin|将文件或者文件夹拷贝构建输出的目录|
|HtmlWebpackPlugin|创建 html 文件去承载输出的 bundle|
|UglifyjsWebpackPlugin|压缩JS|
|ZipWebpackPlugin|将打包出的资源生成的一个zip包|

### 核心概念之 Mode
* Mode 用来指定当前的构建环境是：production、development 还是 none
* 设置 mode 可以使用 webpack 内置的函数，默认值为 production

### Mode函数的内置功能
|选项|描述|
|---|----|
|development|设置 process.env.NODE_ENV 的值为 development.开启 NamedChunksPlugin 和 NamedModulePlugin|
|production|设置 process.env.NODE_ENV 的值为 production.开启 FlagDependencyUsagePlugin, FlagIncludeChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin|
|none|不开启任何优化选项|

### 资源解析：解析 ES6 & JSX
* [babeljs](https://babeljs.io/docs/en/)
* 详细用法：[github.com/babel/babel-loader](https://github.com/babel/babel-loader)
* 使用 babel-loader
* babel的配置文件是：.babelrc
* 增加 ES6 的 babel preset 配置
  * [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
* 增加 JSX 的 babel preset-react配置
  * [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)

### 资源解析：解析 CSS
* css-loader 用于加载 .css 文件，并且转换成 commonjs 对象
* style-loader 将样式通过 <style> 标签插入到 head 中
* [style-loader](https://github.com/webpack-contrib/style-loader)
* [css-loader](https://github.com/webpack-contrib/css-loader)

### 资源解析：解析 Less 和 Sass
* [less-loader](https://github.com/webpack-contrib/less-loader)
  * The less-loader requires less as peerDependency.
* [sass-loader](https://github.com/webpack-contrib/sass-loader)
  * The sass-loader requires you to install either Node Sass or Dart Sass on your own (more documentation you can find below). 

### 资源解析：解析图片
* [file-loader](https://github.com/webpack-contrib/file-loader)
* 用于处理文件

### 资源解析：解析字体
* file-loader 也可以解析字体

### 资源解析：使用 url-loader
* url-loader 也可以处理图片和字体
* 可以设置较小资源自动 base64
* [url-loader](https://github.com/webpack-contrib/url-loader)

### Webpack 中的文件监听
* 文件监听是在发现源码变化时，自动重新构建出新的输出文件
* webpack 开启监听模式，有两种方式
  * 启动 webpack 命令时，带上 --watch 参数
  * 在配置 webpack.config.js 中设置 watch:true
  * 唯一缺陷：每次需要手动刷新浏览器

### 文件监听的原理分析
* 轮询判断文件的最后编辑时间
* 某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout
```js
module.export = {
  // 默认为 false, 也就是不监听
  watch: true
  // 只有开启监听模式，watchOptions 才有意义
  watchOptions: {
    //默认为空，不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    //监听到变化后会等 300ms 再去执行，默认 300ms 
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问 1000 次
    poll: 1000
  }
}
```

### 热更新: webpack-dev-server
* WDS 不刷新浏览器
* WDS 不输出文件，而是放在内存中
* 使用 HotModuleReplacementPlugin 插件
* [hot-module-replacement](https://webpack.js.org/guides/hot-module-replacement/)

### 热更新: 使用 webpack-dev-middleware
* WDM 将 webpack 输出的文件传输给服务器
* 适用于灵活的定制场景

### 热更新的原理分析
* Webpack Compile: 将 JS 编译成 Bundle
* HMR Server: 将热更新的文件输出给 HMR Runtime
* Bundle Server: 提供文件在浏览器中的访问
* HMR Runtime: 会被注入到浏览器，更新文件变化
* bundle.js: 构建输出的文件

### 什么是文件指纹
* 打包后输出的文件名的后缀
* 版本管理
* 对于没有修改的文件，也可以继续使用

### 文件指纹如何生成
* Hash: 和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
* Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会有不同的 chunkhash 值
* Contenthash: 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变 

### JS 的文件指纹设置
* 设置 output 的 filename, 使用 [chunkhash]

### CSS 的文件指纹设置
* 设置 MiniCssExtractPlugin 的 filename, 使用 [contenthash]
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

### 图片的文件指纹设置
* 设置 file-loader 的name，使用 [hash]

|占位符名称|含义|
|---|----|
|[ext]|资源后缀名|
|[name]|文件名称|
|[path]|文件的相对路径|
|[folder]|文件所在的文件夹|
|[name]|文件名称|
|[contenthash]|文件的内容hash, 默认是 md5 生成|
|[hash]|文件的内容hash, 默认是 md5 生成|
|[emoji]|一个随机的指代文件内容的 emoj|


### 代码压缩
* HTML 压缩
* CSS 压缩
* JS 压缩

### JS 文件的压缩
* 内置了 uglifyjs-webpack-plugin

### CSS 文件的压缩
* 使用 optimize-css-assets-webpack-plugin
  * [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
* 同时使用 cssnano

### html 文件的压缩
* 修改 html-webpack-plugin，设置压缩参数
  * [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

### 自动清理构建目录
* 避免构建前每次都需要手动删除 dist
* 使用 [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
  * 默认删除 output 指定的目录

### CSS3 的属性为什么需要前缀？
* Trident(-ms)
* Geko(-moz)
* Webkit(-webkit)
* Presto(-o)

### PostCSS 插件 autoprefixer 自动补齐 CSS3 前缀
* [https://github.com/postcss/postcss](https://github.com/postcss/postcss)
* [https://postcss.org](https://postcss.org)
* 使用 autoprefixer
* 根据 Can I Use 规则[Can I Use](https://caniuse.com)

### rem 是什么？
* W3C 对 rem 的定义：font-size of the root element
* rem 和 px 的对比
  * rem 是相对单位
  * px 是绝对单位

### 移动端 CSS px 自动转换成 rem
* 使用 [px2rem-loader](https://github.com/Jinjiang/px2rem-loader)
* 页面渲染时计算根元素的 font-size 值
  * 可以使用手淘的 [lib-flexible](https://github.com/amfe/lib-flexible) 库

### 资源内联的意义
* 代码层面
  * 页面框架的初始化版本
  * 上报相关打点
  * css 内联避免页面闪动
* 请求层面：减少 HTTP 网络请求
  * 小图片或者字体内联(url-loader)

### HTML 和 JS 的内联
* raw-loader(0.5.1) 内联 html
  * ${ require('raw-loader!./meta.html') }
* raw-loader 内联 js
  * <script>${ require('raw-loader!../../node_modules/lib-flexible/flexible.js') }</script>

### CSS 内联
* 方案一：借助 style-loader
* 方案二：html-inline-css-webpack-plugin

### 多页面应用(MPA)概念
* 每一次页面跳转的时候，后台服务器都会返回一个新的 html 文档，这种类型的网站也就是多页网站，也叫做多页应用。

### 多页面打包思路
* 每个页面对应一个 entry，一个 html-webpack-plugin
* 缺点：每次新增或删除页面需要改 webpack 配置

### 多页面打包通用方案
* 动态获取 entry 和设置 html-webpack-plugin 数量
* 利用 glob.sync 
  * [Glob](https://github.com/isaacs/node-glob)
  * entry: glob.sync(path.join(__dirname, './src/*/index.js')),

### 使用 sourcemap
* 作用：通过 source map 定位到源码
  * source map科普文：[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

* 开发环境开启，线上环境关闭
 * 线上排查问题的时候可以将 sourcemap 上传到错误监控系统里面去

### Source map 关键字
* eval: 使用 eval 包裹模块代码
* source map: 产生 .map 文件
* cheap: 不包含列信息
* inline: 将 .map 作为 DataURL 嵌入，不单独生成 .map 文件
* module: 包含 loader 和 sourcemap

### Source Map 类型
[devtool](https://webpack.js.org/configuration/devtool/#devtool)

### 基础库的分离
* 思路：将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中
* 方法：使用 [html-webpack-externals-plugin](https://github.com/mmiller42/html-webpack-externals-plugin)

### 利用 SplitChunksPlugin 进行公共脚本分离
* Webpack4 内置，替代 CommonsChunkPlugin 插件
* chunks 参数说明
  * async 异步引入的库进行分离（默认）
  * initial 同步引入的库进行分离
  * all 所有引入的库进行分离（推荐）
* [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)
  * test: 匹配出需要分离的包
  * minChunks: 设置最小引用次数为 2 次
  * minSize：分离的包的体积大小（至少）

### tree shaking(摇树优化)
* 概念：1 个模块可能有多个方法，只要其中的某个方法使用到了
* 则整个文件都会被打到 bundle 里面去，tree shaking 就是
* 只把用到的方法打入 bundle，没用到的方法会 uglify 阶段被擦除掉

* 使用：webpack 默认支持，在 .babelrc 里设置 modules：false 即可
  * production mode 的情况下默认开启

* 要求：必须是 ES6 的语法，CJS 的方式不支持

### DCE(Elimination)
* 代码不会被执行，不可到达
* 代码执行结果不会被用到
* 代码只会影响死变量（只写不读）

### Tree-shaking 原理
* 利用 ES6 模块的特点
  * 只能作为模块顶层的语句出现
  * import 的模块名只能是字符串常量
  * import binding 是 immutable 的
代码擦除：uglify 阶段删除无用代码

### 现象：构建后的代码存在大量闭包代码
* 会导致什么问题
  * 大量函数闭包包裹代码，导致代码体积增大（模块越多越明显）
  * 运行代码时创建的函数作用域越多，内存开销大

### 模块转换分析
* 结论
  * 被 webpack 转换后的模块会带上一层包裹
  * import 会被转换成 __webpack_require

### 进一步分析 webpack 的模块机制
* 打包出来的是一个 IIFE（匿名闭包）
* modules 是一个数组，每一项是一个模块初始化函数
* __webpack_require 用来加载模块，返回 module.exports
* 通过 WEBPACK_REQUIER_METHOD(0) 启动程序

### Scope Hoisting 原理
* 原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名的冲突
* 对比：通过 scope hoisting 可以减少函数声明代码和内存开销

### Scope Hoisting 使用
* webpack mode 为 production 默认开启
* 必须是 ES6 语法，CJS 不支持
* new webpack.optimize.ModuleConcatenationPlugin()--> webpack 4 production mode 默认开启

### 代码分割的意义
* 对于大型的 Web 应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使用到。webpack 有个功能是将你的代码分割成 chunks (语块)，当代码运行到需要它们的时候再进行加载。
* 适用场景
  * 抽离相同代码到一个共享块
  * 脚本懒加载，使得初始下载的代码更小

### 懒加载 JS 脚本的方式
* CommonJS: require.entrue
* ES6：动态 import (目前还没有原生支持，需要 babel 转换)

### 如何使用动态 import?
* 安装 babel 插件
* [@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)



